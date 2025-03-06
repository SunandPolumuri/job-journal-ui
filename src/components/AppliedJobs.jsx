import { useGetAllJobsQuery } from "@/services/jobsApi"
import JobCard from "./JobCard"

const AppliedJobs = () => {

    const { data: jobs } = useGetAllJobsQuery(undefined, {refetchOnMountOrArgChange: true})

    return (
        <div>
            <h2 className="font-bold text-2xl mb-3 opacity-90">Applied Jobs</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 overflow-auto">
                {jobs?.map((job) => (
                    <JobCard key={job?.job_id} job={job}/>
                ))}
            </div>
        </div>
    )
}

export default AppliedJobs