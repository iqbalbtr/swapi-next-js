import jwt, { JwtPayload } from "jsonwebtoken"
import { AccessTokenType } from "../../types/accessToken";

interface Payload {
    userId: string;
    name: string;
    email: string;
    exp: number;
}

export const verifyToken = (accessToken: string) => {
    const verify = jwt.verify(accessToken, process.env.SECRET_KEY!) as JwtPayload
    if (verify) {
        const now = new Date().getTime()
        if (verify.exp && verify.exp > now) {

            const result: AccessTokenType = {
                userId: verify.userId,
                email: verify.email,
                name: verify.name,
                iat: verify.iat,
                exp: verify.exp
            }

            return result
        } else {
            return false
        }
    } else {
        return false
    }
}

export const getAccessToken = (payload: Payload) => {
    const accessToken = jwt.sign(
        payload,
        process.env.SECRET_KEY!,
        {
            algorithm: "HS256"
        }
    )
    if (accessToken) {
        return accessToken
    } else {
        return false
    }
}