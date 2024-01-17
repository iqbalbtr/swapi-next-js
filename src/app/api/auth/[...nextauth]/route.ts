import { Account, Awaitable, NextAuthOptions, Session, User } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectDatabase } from "../../../../../helpers/server-helper";
import prisma from "../../../../../prisma";
import { getAccessToken } from "../../../../../lib/jwt";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

// interface UserType {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
// }

// interface Account {
//     provider: string;
//     type: string;
//     providerAccountId: string;    
//     access_token: string; 
//     expires_at: number;
//     scope: string; 
//     token_type: string;
//     id_token: string;
// }

// const callbackType : (params: {
//     token: JWT;
//     user: User | AdapterUser;
//     account: Account | null;
//     profile?: Profile | undefined;
//     trigger?: "signIn" | "update" | "signUp" | undefined;
//     isNewUser?: boolean | undefined;
//     session?: any;
//   }) => Awaitable<JWT> | undefined = async ({ token, user, account, profile, isNewUser }) => {

//     return Promise.resolve(token);
//   };

const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET_KEY,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET_ID!
        })
    ],
    callbacks: {
        async jwt({ token, user, account}: { token: JWT; user:  User | AdapterUser; account: Account | null }) {

            if (account?.provider === "google") {
                try {
                    await connectDatabase()
                    const queryUser = await prisma.user.findUnique({
                        where: {
                            email: user.email!
                        }
                    })
                    if (!queryUser) {
                        const query = await prisma.user.create({
                            data: {
                                email: user.email!,
                                name: user.name!,
                                loginAt: new Date()
                            }
                        })

                        if (query) {
                            token.email = query.email
                            token.name = query.name
                        } 
                    } else {
                        const query = await prisma.user.update({
                            where: {
                                email: user.email!
                            },
                            data: {
                                loginAt: new Date()
                            }
                        })
                        if (query) {
                            token.id = query.id
                            token.email = query.email
                            token.name = query.name
                        } 
                    }
                } catch (error) {
                    throw new Error
                } finally {
                    prisma.$disconnect()
                }
            }

            const payload = {
                userId: token.id as string,
                name : token.name as string,
                email : token.email as string,
                exp : new Date().getTime() + (1 * 60 * 60 * 1000)
            }

            const accessToken = getAccessToken(payload)
            token.accessToken = accessToken
            return token
        },
        async session({ session, token, trigger }: {session: Session; token: JWT; trigger: "update"}) {
      
            if ("accessToken" in token) {
                session.accessToken = token.accessToken
            }

            if (trigger === "update") {
                return {
                    ...session,
                    expires: new Date().getTime() + (1 * 60 * 60 * 1000)
                }
            }

            session.expires = new Date().getTime() + (1 * 60 * 60 * 1000 )

            return session
        },
    }
}

const handler = NextAuth(authOption)

export {
    handler as POST,
    handler as GET
}