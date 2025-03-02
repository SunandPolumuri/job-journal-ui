import { removeUser, setUser } from "@/slices/userSlice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseApi } from "./baseApi"

export const userApi = baseApi.injectEndpoints({
    // reducerPath: "userApi",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users`,
    //     credentials: "include"
    // }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => "/users/getUser",
            // providesTags: ["getUser"]
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: "/users/login",
                method: "POST",
                body: payload
            }),
            onQueryStarted: async (payload, {dispatch, queryFulfilled}) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                } catch (error) {
                    dispatch(removeUser())
                }
            }
        }),
        createUser: builder.mutation({
            query: (payload) => ({
                url: "/users/createUser",
                method: "POST",
                body: payload
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST"
            }),
            // invalidatesTags: ["getUser"]
        })
    })
})

export const { useGetUserQuery, useLazyGetUserQuery, useLoginMutation, useCreateUserMutation, useLogoutMutation } = userApi