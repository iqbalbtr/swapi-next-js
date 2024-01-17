import { connectDatabase } from "../../helpers/server-helper"
import prisma from "../../prisma";

export interface Planetfetch {
    planet: string,
    idPlanet: string,
    climate: string,
    diameter: string,
    userId: any
}

export const getWislistUser = async (userId: string, offset: number, itemPage: number) => {
    connectDatabase()
    try {
        const query = await prisma.user.findFirst({
            where: {
                id: userId
            }, include: {
                wishlist: {
                    take: itemPage,
                    skip: offset
                }
            }
        })

        const queryCount = await prisma.wishlist.count({
            where: {
                userId: userId
            }
        })

        if (query && queryCount) {
            return {
                wishlis: query.wishlist,
                count: queryCount
            }
        }
    } catch {
        throw new Error("Failed fetching")
    } finally {
        prisma.$disconnect
    }
}

export const deleteWishlist = async (wishlistId: any) => {
    connectDatabase();
    try {
        const query = await prisma.wishlist.delete({
            where: {
                id: wishlistId
            }
        })
        if (query) {
            return query
        }
    } catch (error) {
        throw new Error("Failed")
    } finally {
        prisma.$disconnect
    }
}

export const createWishlist = async (data: Planetfetch) => {
    connectDatabase()
    try {
        const req = await prisma.wishlist.create({
            data: {
                planet: data.planet,
                idPlanet: data.idPlanet || "",
                climate: data.climate,
                diameter: data.diameter,
                userId: data.userId
            }
        })

        if (req) {
            return req
        } else {
            return false
        }
    } catch (error) {
        throw new Error("Internal server error")
    } finally {
        prisma.$disconnect
    }
}


export const getWishlistById = async (userId:string, planetId: string) => {
    connectDatabase()
    try {
        const query = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                wishlist: {
                    where: {
                        idPlanet: planetId
                    }
                }
            }
        })

        if (query?.wishlist.length ?? 0 > 0) {
            return query?.wishlist[0]
        } else {
            return false
        }
    }
    catch (error) {
        throw new Error("Error")
    } finally {
        prisma.$disconnect
    }
}

