import { useGetStatusTimelineQuery } from "@/services/jobsApi"
import { isFinalStatusUpdate } from "@/utils/utils"
import AddStatusUpdateButton from "./AddStatusUpdateButton"
import StatusTimelineElement from "./StatusTimelineElement"

const StatusTimeline = ({ jobId, currentStatus }) => {

    const { data, isLoading } = useGetStatusTimelineQuery(jobId, {refetchOnMountOrArgChange: true})

    return (
        (!isLoading && data) ? (
            <div>
                <h2 className="font-bold text-2xl mb-3 opacity-90">Status Timeline</h2>
                {data.map((status) => (
                    <StatusTimelineElement status={status} />
                ))}
                {!isFinalStatusUpdate(currentStatus) && <AddStatusUpdateButton currentStatus={currentStatus} jobId={jobId}/>}
            </div>
        )
        : null
    )
}

export default StatusTimeline