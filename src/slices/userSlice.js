import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    userDetails: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true,
            state.userDetails = action.payload
        },
        removeUser: (state) => {
            console.log('initial state ', initialState)
            state.isLoggedIn = false,
            state.userDetails = {}
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export const getUser = (state) => state.user

export default userSlice.reducer