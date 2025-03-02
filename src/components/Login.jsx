import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useCreateUserMutation, useGetUserQuery, useLoginMutation } from "../services/userApi"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { getUser, removeUser } from "@/slices/userSlice"

const Login = () => {

    const location = useLocation()
    const navigate = useNavigate()
    
    const { data: userLoginData, isError: userLoginError } = useGetUserQuery(undefined, {refetchOnMountOrArgChange: true})

    useEffect(() => {
        if(userLoginData?.message === "User fetched successfully" && !userLoginError) {
            navigate("/")
        }
    }, [userLoginData, userLoginError])

    const isLoginPage = location.pathname === "/login"

    const [userDetails, setUserDetails] = useState({
        email: "test3@mail.com",
        password: "test3@123"
    })
    const [error, setError] = useState("")


    const [login, { isLoading, isError }] = useLoginMutation()
    const [createUser, { isLoading: createUserLoading, isError: createUserError }] = useCreateUserMutation()

    const cardTexts = {
        title: isLoginPage ? "Login" : "Sign up",
        subTitle: isLoginPage ? "Enter email and password to login" : "Create a new account",
        bottomText: isLoginPage ? "Don't have an account?" : "Already have an account?",
        link: isLoginPage ? "Sign up" : "Login"
    }

    const resetUserDetails = () => {
        setError("")
        setUserDetails({})
    }

    const switchLogin = () => {
        navigate(isLoginPage ? "/signup" : "/login")
        resetUserDetails()
    }
 
    const handleInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(userDetails)
        if(isLoginPage) {
            try {
                const res = await login(userDetails).unwrap()
                console.log('Response ', res.status)
                resetUserDetails()
                navigate("/")
            } catch (error) {
                setError(error?.data?.message)
            }
        } else {
            try {
                const createUserRes = await createUser(userDetails).unwrap()
                console.log('Create user ', createUserRes)
                resetUserDetails()
                navigate("/login")
            } catch (error) {
                setError(error?.data?.message)
            }
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">{cardTexts.title}</CardTitle>
                            <CardDescription>{cardTexts.subTitle}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                
                                <div className="flex flex-col gap-6">
                                    {!isLoginPage && <div className="grid gap-2">
                                        <Label htmlFor="email">Name</Label>
                                        <Input 
                                            id="name"
                                            type="text"
                                            name="name"
                                            required
                                            value={userDetails.name ?? ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input 
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="name@mail.com"
                                            required
                                            value={userDetails.email ?? 'test5@mail.com'}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input 
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            value={userDetails.password ?? 'test5@123'}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Button onClick={handleLogin}>{cardTexts.title}</Button>
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                    <div className="text-center text-sm">
                                        <span className="text-muted-foreground">{cardTexts.bottomText} {" "}</span>
                                        <span className="underline underline-offset-2 cursor-pointer" onClick={switchLogin}>{cardTexts.link}</span>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login