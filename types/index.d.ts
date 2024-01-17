export interface WishlistType {
    addAt: Date;
    climate: string;
    id: string;
    diameter: string;
    idPlanet: string;
    planet: string;
    userId: string;
}

export type LoadingType = "loading" | "idle" | "error" | "success"