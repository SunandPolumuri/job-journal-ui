import { useGetAllJobsQuery } from "@/services/jobsApi"
import { getStatus } from "@/utils/utils"
import { useMemo } from "react"

const JobStats = () => {

    const { data } = useGetAllJobsQuery()

    const jobStats = useMemo(() => {
        const countByStatus = {}
        data?.forEach((item) => {
            if(countByStatus[item?.status] === undefined) {
                countByStatus[item.status] = 1
            } else {
                countByStatus[item.status] = countByStatus[item.status] + 1
            }
        })
        return countByStatus
    }, [data])

    return (
        (Object.keys(jobStats).length > 0) ?
            <div className="my-2">
                <h2 className="font-bold text-2xl mb-3 opacity-90">Application Stats</h2>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {Object.keys(jobStats).map((status) => (
                        <div className="flex justify-between items-center px-2 h-14" style={{backgroundImage: `linear-gradient(90deg, var(--${status}) -50%, transparent 75%)`}}>
                            <span className="font-semibold text-lg text-primary/95">{getStatus(status)}</span>
                            <h2 className="text-3xl font-semibold opacity-90 text-foreground/90">{jobStats[status]}</h2>
                            {/* <h2 className="text-4xl font-semibold opacity-90" style={{color: `var(--${status})`}}>{jobStats[status]}</h2> */}
                        </div>
                    ))}
                </div>
            </div>
        : null
    )
}

export default JobStats