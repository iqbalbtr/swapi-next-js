import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { createWishlist, deleteWishlist, getWislistUser } from "../../../../lib/mongodb/service";
import { getPlanetById } from "../../../../services/planets";
import { verifyToken } from "../../../../lib/jwt";
import { dataResponse, messageResponse } from "../../../../utils/statusCode";


export async function GET(
    req: NextRequest
) {
    try {
        const { searchParams } = new URL(req.url)
        const accessToken = req.headers.get("Authorization")?.split(' ')[1]
        const page = searchParams.get("page")
        const itemPage = 5

        if (!accessToken)
            return messageResponse(req, "Bad Request", 400)

        const verify = verifyToken(accessToken)

        if (!verify) 
            return messageResponse(req, "Access Denied", 401)

        if (page) {
            const offset = (parseInt(page) - 1) * 5
            const q = await getWislistUser(verify.userId, offset, itemPage)

            if (!q)
                return messageResponse(req, "No Content", 204)

            const currentPage = q?.count / 5

            const result = {
                currentPage: parseInt(page),
                page: Math.ceil(currentPage),
                wishlist: q.wishlis,
                count: q.count
            }

            return dataResponse(req, result, 200)
        }

        const q = await getWislistUser(verify.userId, 0, itemPage)

        return dataResponse(req, q, 200)

    } catch (error) {
        return messageResponse(req, "Internal Server Error", 500)
    }
}

export async function POST(req: NextRequest) {
    try {
        const { planetId } = await req.json()
        const accessToken = req.headers.get("Authorization")?.split(' ')[1]

        if (!planetId || !accessToken)
            return messageResponse(req, "Bad Request", 400)

        const verify = verifyToken(accessToken)

        if (!verify)
            return messageResponse(req, "Access Denied", 401)

        const planet = await getPlanetById(planetId)

        const data = {
            planet: planet?.name,
            idPlanet: planetId,
            climate: planet?.climate,
            diameter: planet?.diameter,
            userId: verify.userId
        }

        const query = await createWishlist(data)

        if (!query)
            return messageResponse(req, "No Content", 204)

        return NextResponse.json({
            status: true, data: query
        }, {
            status: 200
        })

    }
    catch (error) {
        return messageResponse(req, "Internal Server Error", 500)
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { wishlistId } = await req.json();
        const accessToken = req.headers.get("Authorization")?.split(' ')[1];

        if (!wishlistId || typeof wishlistId !== 'string' || !accessToken) 
            return messageResponse(req, "Bad Request", 400);
        
        const verify = verifyToken(accessToken);

        if (!verify) {
            return messageResponse(req, "Access Denied", 401)
        }

        const result = await deleteWishlist(wishlistId);

        if (!result) {
            return messageResponse(req, "No Contect", 204);
        }

        return NextResponse.json({ 
            status: true, data: result
         }, { 
            status: 200 
        });
    } catch (error) {
        return messageResponse(req, "Internal Server Error", 500)
    }
}
