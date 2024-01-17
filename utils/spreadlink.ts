
export const spreadLink = (link: string) => {
    const result = link.split("/")
    return result[5]
}