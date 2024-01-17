export const getWishlistService = async(accessToken: string, page: string) => {
    try {
        const req = await fetch(`/api/wishlist?page=${page}`, {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        if (req) {
            return await req.json()
        }
    } catch (error) {
        throw new Error("Error")
    }
}

export const deleteWishlistService = async (accessToken: any, wishlistId: string) => {
    try {
        const res = await fetch(`/api/wishlist`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            method: "DELETE",
            body: JSON.stringify({
                wishlistId : wishlistId,
            })
        })
        if (res) {
            return res.json()
        }
    } catch (err) {
        throw new Error("Error")
    }
}

export const createWishlistService = async (accesToken: string, planetId: string) => {
    try {
        const res = await fetch(`/api/wishlist`, {
            headers: {
                'Authorization': `Bearer ${accesToken}`
            },
            method: "POST",
            body: JSON.stringify({
                planetId: planetId
            })
        })
        if(res) {
            return res.json()
        }
    } catch (error) {
        throw new Error("Error")
    }
}

export const getWishlistByIdService = async(accessToken: string, planetId: string) => {
    try {
        const res = await fetch(`/api/wishlist/${planetId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            method: "GET"
        })
        if (res) {
            return await res.json()
        }
    } catch (error) {
        throw new Error("Error")
    }
}

// export const getWishlist = async () => {
//     try {
//         const res = await fetch("/api/wishlist")
//         if (res.ok) {
//             return await res.json()
//         }
//     } catch (error) {
//         throw new Error("Error")
//     }
// }

// export const getPlanetWishlist = async (idPlanet: string) => {
//     try {
//         const res = await fetch(`/api/wishlist?planet=${idPlanet}`)
//         if (res.ok) {
//             return await res.json()
//         }
//     } catch (error) {
//         throw new Error("Error")
//     }
// }
