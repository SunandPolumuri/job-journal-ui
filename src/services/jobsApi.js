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
        }),
        getJobById: builder.query({
            query: (jobId) => `/jobs/getJobById/${jobId}`,
            transformResponse: (response) => {
                return response?.job
            },
            providesTags: ["getJobById"]
        }),
        updateJob: builder.mutation({
            query: ({jobId, payload}) => {
                console.log("payload ", payload)
                return {
                url: `/jobs/updateJob/${jobId}`,
                method: "PUT",
                body: payload
            }},
            invalidatesTags: ["getJobById"]
        }),
        getStatusTimeline: builder.query({
            query: (statusId) =>   `/jobs/getStatusTimeline/${statusId}`,
            providesTags: ["getStatusTimeline"]
        }),
        addStatus: builder.mutation({
            query: ({jobId, payload}) => ({
                url: `/jobs/addStatus/${jobId}`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["getStatusTimeline", "getJobById", "getAllJobs"]
        })
    })
})

export const { useGetAllJobsQuery, useAddJobMutation, useGetJobByIdQuery,
     useUpdateJobMutation, useGetStatusTimelineQuery, useAddStatusMutation } = jobsApi