import { useGetStatusTimelineQuery } from "@/services/jobsApi"
import { getStatus, isFinalStatusUpdate } from "@/utils/utils"
import AddStatusUpdateButton from "./AddStatusUpdateButton"

const StatusTimeline = ({ jobId, currentStatus }) => {

    const { data, isLoading } = useGetStatusTimelineQuery(jobId, {refetchOnMountOrArgChange: true})

    return (
        (!isLoading && data) ? (
            <div>
                <h2 className="font-bold text-2xl mb-3 opacity-90">Status Timeline</h2>
                {data.map((status) => (
                    <div className="flex gap-x-5 min-h-20">
                        <div className="flex flex-col items-center">
                            <div className="size-10 rounded-full border-4 border-foreground" style={{backgroundColor: `var(--${status?.status ?? "default"})`}}></div>
                            {!isFinalStatusUpdate(status?.status) && <div className="w-2 grow my-2 rounded-md" style={{backgroundColor: `var(--${status?.status ?? "default"})`}}></div>}
                        </div>
                        <div className="pb-3">
                            <div className="font-semibold text-2xl">{getStatus(status?.status)}</div>
                            <span className="text-primary/75 text-xs">{(new Date(status?.created_at)?.toLocaleString())}</span>
                        </div>
                    </div>
                ))}
                {/* <AddStatusUpdateButton currentStatus={"shortlisted"}/> */}
                {!isFinalStatusUpdate(currentStatus) && <AddStatusUpdateButton currentStatus={currentStatus} jobId={jobId}/>}
            </div>
        )
        : null
    )
}

export default StatusTimeline