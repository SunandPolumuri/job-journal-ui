import { useLazyGetUserQuery } from "../../services/userApi"
import { removeUser, setUser } from "@/slices/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const ProtectedRoutes = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getUserQuery, {data: userData, isLoading, isError, isSuccess, error}] = useLazyGetUserQuery()

    const user = useSelector((state) => state.user)

    useEffect(() => {
        if(!user.isLoggedIn) {
            getUserQuery()
        }
    }, [user.isLoggedIn])

    useEffect(() => {
        if(error?.data?.message === "Unauthorized") {
            dispatch(removeUser())
            return navigate("/login")
        }
        userData && dispatch(setUser(userData.user))
    }, [userData, error])

    useEffect(() => {
        if(isError) {
            navigate("/login")
        }
    }, [isError])

    if(isLoading) {
        return <div>Loading.....</div>
    }
    

    // if(isError) {
    //     console.log("PR error")
    //     return <Navigate to="/login" replace/>
    // }

    if(user.isLoggedIn) {
        return <Outlet/>
    }

    return null
}

export default ProtectedRoutes