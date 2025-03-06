import { useParams } from "react-router-dom"
import { useGetJobByIdQuery } from "@/services/jobsApi"
import REACT_ICON from "../assets/react.svg"
import { PiMapPin } from "react-icons/pi"
import { PiArrowSquareOut } from "react-icons/pi";
import { getStatus } from "@/utils/utils"
import EditJobDialog from "./EditJobDialog"
import StatusTimeline from "./StatusTimeline";

const JobDetailsPage = () => {

    const params = useParams()

    const jobId = params.jobId
    const { data: jobDetails, isLoading, isError } = useGetJobByIdQuery(jobId)

    if(isError) {
        return <span className="text-xl">Error fetching job</span>
    }

    const getJobLink = (platform, link) => {
        if(!platform && !link) return null
        if(!platform && link) {
            platform = "Go to source"
        }

        return (
            <a className="flex items-center gap-x-0.5 hover:underline hover:text-primary" href={link ?? "#"} target="_blank" rel="noreferrer nofollow">
                <PiArrowSquareOut/>
                <span>{platform}</span>
            </a>
        )
    }

    return (
        <>
            {!isLoading ? 
                <div className="p-4" style={{backgroundImage: `linear-gradient(to bottom, var(--${jobDetails?.status ?? "default"}), 25%, transparent)`}}>
                    <div className="flex items-center justify-between gap-x-2" >
                        <div className="flex items-center gap-x-4 min-w-0">
                            <img src={REACT_ICON} className="h-12 w-12" alt="job_icon" />
                            <div className="flex flex-col min-w-0">
                                <h2 className="font-bold text-xl sm:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{jobDetails?.company_name}</h2>
                                <span className="text-primary/85 text-base font-semibold sm:text-lg">{jobDetails?.job_role}</span>
                                <div className="text-xs sm:text-sm mt-1 flex gap-x-2 items-center text-primary/75 flex-wrap sm:flex-nowrap">
                                    {jobDetails?.job_location && <div className="flex items-center gap-x-0.5">
                                            <PiMapPin/>
                                            <span className="">{jobDetails.job_location}</span>
                                        </div>
                                    }
                                    {getJobLink(jobDetails?.job_platform, jobDetails?.job_link)}
                                    <EditJobDialog jobId={jobDetails?.job_id} job={jobDetails}/>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-semibold text-xl sm:text-2xl">{getStatus(jobDetails.status)}</span>
                        </div>
                    </div>
                    {/* <EditJobDialog jobId={jobDetails?.job_id} job={jobDetails}/> */}
                    <div className="flex flex-wrap gap-4 sm:flex-nowrap mt-5">
                        <div className="grow">
                            <h2 className="font-bold text-2xl mb-3 opacity-90">Job Description</h2>
                            <p className="py-0">
                                {jobDetails.job_details?.job_description}
                            </p>
                        </div>
                        <div className="min-w-4/12 lg:min-w-3/12">
                            <StatusTimeline jobId={jobDetails?.job_id} currentStatus={jobDetails?.status}/>
                        </div>
                    </div>
                </div> :
                null
            }
        </>
    )
}

export default JobDetailsPage