import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseApi } from "./baseApi"

export const jobsApi = baseApi.injectEndpoints({
    // reducerPath: "jobs",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: `${import.meta.env.VITE_API_BASE_URL}/jobs`,
    //     credentials: "include"
    // }),
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => "/jobs/getAllJobs",
            providesTags: ["getAllJobs"]
        }),
        addJob: builder.mutation({
            query: (payload) => ({
                url: "/jobs/addJob",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["getAllJobs"]
        })
    })
})

export const { useGetAllJobsQuery, useAddJobMutation } = jobsApi