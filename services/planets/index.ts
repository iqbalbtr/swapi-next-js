
export const getPlanetsByPage = async(id: string) => {
    try {
        const res = await fetch(`https://swapi.dev/api/planets?page=${id}`)
        if(res.ok) {
            const result = await res.json()
            return result
        } else {
            console.error("Fetching failed");
            return null
        }
    } catch (err) {
        console.error(err);
        return null
    }
}

export const getPlanetById = async(id: string) => {
    try {
        const res = await fetch(`https://swapi.dev/api/planets/${id}/`)
        if(res.ok) {
            const result = await res.json()
            return result
        } else {
            console.error("Fetching failed");
            return null
        }
    } catch (err) {
        console.error(err);
        return null
    }
}