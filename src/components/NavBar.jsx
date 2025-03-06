import { useState } from "react"
import { Button } from "./ui/button"
import { PiSun } from "react-icons/pi"
import { PiMoon } from "react-icons/pi"
import { PiUserCircle } from "react-icons/pi"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useLogoutMutation, userApi } from "@/services/userApi"
import { removeUser } from "@/slices/userSlice"
import { baseApi } from "@/services/baseApi"

const NavBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [logout] = useLogoutMutation()

    const user = useSelector((state) => state.user)

    const [currentTheme, setCurrentTheme] = useState(document.querySelector('[data-theme]').dataset?.theme ?? "dark")

    const handleThemeChange = () => {
        if (currentTheme === 'dark') {
            document.querySelector('[data-theme]').setAttribute('data-theme', 'light')
            setCurrentTheme('light')
        } else {
            document.querySelector('[data-theme]').setAttribute('data-theme', 'dark')
            setCurrentTheme('dark')
        }
    }

    const handleLogoutClick = async (e) => {

        await logout().unwrap()
        dispatch(removeUser())
        // dispatch(userApi.util.resetApiState())
        dispatch(baseApi.util.resetApiState())
        navigate("/login")
        
    }

    const getUserDropdown = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                        <PiUserCircle/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={handleLogoutClick}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="flex justify-between items-center p-3.5">
            <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>JobJournal</h2>
            <div>
                <Button size="sm" variant="ghost" onClick={handleThemeChange}>
                    {currentTheme === "dark" ? <PiSun/> : <PiMoon />}
                </Button>
                {user?.isLoggedIn && 
                    getUserDropdown()
                }
            </div>
        </div>
    )
}

export default NavBar