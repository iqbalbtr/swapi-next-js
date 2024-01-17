import prisma from "../prisma"

export const connectDatabase = async() => {
    try {
        await prisma.$connect
    } catch (error) {
        console.error(error);
        throw new Error("unable conect database")
    }
}