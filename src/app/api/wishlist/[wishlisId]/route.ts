import { NextRequest, NextResponse } from "next/server";
import { getWishlistById } from "../../../../../lib/mongodb/service";
import { messageResponse } from "../../../../../utils/statusCode";
import { verifyToken } from "../../../../../lib/jwt";

export async function GET(req: NextRequest) {

    try {
        const url = req.url.split('http://localhost:3000/api/wishlist/')[1]
        const accessToken = req.headers.get("Authorization")?.split(" ")[1]
        if (!accessToken)
            return messageResponse(req, "Bad Request", 400)

        const verify = verifyToken(accessToken)

        if (!verify)
            return messageResponse(req, "Access Denied", 401)

        const q = await getWishlistById(verify.userId, url)

        if (!q)
            return messageResponse(req, "No Content", 204)

        return NextResponse.json({
            data: q, status: true
        }, {
            status: 200
        })

    } catch (error) {
        return messageResponse(req, "Internal Server Error", 500)
    }
}