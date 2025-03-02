import { useGetAllJobsQuery } from "@/services/jobsApi"
import JobCard from "./JobCard"

const AppliedJobs = () => {

    const { data: jobs } = useGetAllJobsQuery()

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
            {jobs?.map((job) => (
                <JobCard job={job}/>
            ))}
        </div>

    )
}

export default AppliedJobs