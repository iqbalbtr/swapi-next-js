import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name: any,
      email: string,
      image: string
    },
    accessToken: any,
    expires: number
  }
}