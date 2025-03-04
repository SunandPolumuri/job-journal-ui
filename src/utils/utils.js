import { status_timeline } from "./constants"

export const checkToken = () => {
    const token = document.cookie.split(";")
                    .find((row) => row.startsWith("JWT-Token"))
                    .split("=")[1]
    return token
}

export const getStatus = (statusValue) => {
    if(!statusValue) return ""
    return status_timeline.find((ele) => ele.value === statusValue)?.title
}