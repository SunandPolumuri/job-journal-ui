import { useParams } from "react-router-dom"
import { useGetJobByIdQuery } from "@/services/jobsApi"
import REACT_ICON from "../assets/react.svg"
import { PiMapPin } from "react-icons/pi"
import { getStatus } from "@/utils/utils"
import EditJobDialog from "./EditJobDialog"

const JobDetailsPage = () => {

    const params = useParams()

    const jobId = params.jobId
    const { data: jobDetails, isLoading, isError } = useGetJobByIdQuery(jobId)

    if(isError) {
        return <span className="text-xl">Error fetching job</span>
    }

    return (
        <>
            {!isLoading ? 
                <div>
                    <div className="flex items-center justify-between gap-x-2 p-4" 
                        style={{backgroundImage: `linear-gradient(180deg, var(--${jobDetails?.status ?? "default"}), transparent)`}}>
                        <div className="flex items-center gap-x-3 min-w-0">
                            <img src={REACT_ICON} className="h-12 w-12" alt="job_icon" />
                            <div className="flex flex-col min-w-0">
                                <h2 className="font-semibold text-xl sm:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{jobDetails?.company_name}</h2>
                                <span className="text-primary/75 text-base sm:text-lg">{jobDetails?.job_role}</span>
                                {jobDetails?.job_location && <div className="text-xs sm:text-sm mt-1 flex gap-x-0.5 items-center text-muted-foreground">
                                    <PiMapPin/>
                                    <span className="">{jobDetails.job_location}</span>
                                </div>}
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="font-semibold text-base sm:text-lg">{getStatus(jobDetails.status)}</span>
                        </div>
                    </div>
                    <EditJobDialog jobId={jobDetails?.job_id} job={jobDetails}/>
                </div> :
                null
            }
        </>
    )
}

export default JobDetailsPage