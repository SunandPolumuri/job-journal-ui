import { useGetAllJobsQuery } from "@/services/jobsApi"
import JobCard from "./JobCard"

const AppliedJobs = () => {

    const { data: jobs } = useGetAllJobsQuery(undefined, {refetchOnMountOrArgChange: true})

    return (
        <div className="flex gap-2">
            <div className="grow">
                <h2 className="font-bold text-2xl mb-3 opacity-90">Applied Jobs</h2>
                {jobs?.length === 0 ? 
                    <div>
                        <span className="text-muted-foreground">You haven't added any jobs yet</span>
                    </div>
                    :
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
                        {jobs?.map((job) => (
                            <JobCard key={job?.job_id} job={job}/>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default AppliedJobs