import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./services/userApi"
import userReducer from "./slices/userSlice"
import { jobsApi } from "./services/jobsApi"
import { baseApi } from "./services/baseApi"

export const store = configureStore({
    reducer: {
        user: userReducer,
        // [userApi.reducerPath]: userApi.reducer,
        // [jobsApi.reducerPath]: jobsApi.reducer
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(baseApi.middleware)
            // .concat(userApi.middleware)
            // .concat(jobsApi.middleware)
})