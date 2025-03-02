export const checkToken = () => {
    const token = document.cookie.split(";")
                    .find((row) => row.startsWith("JWT-Token"))
                    .split("=")[1]
    return token
}