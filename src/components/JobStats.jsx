import { useGetAllJobsQuery } from "@/services/jobsApi"
import { getStatus } from "@/utils/utils"
import { useEffect, useMemo, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"

const JobStats = () => {

    const [isOpen, setIsOpen] = useState(false)

    const { data } = useGetAllJobsQuery()

    useEffect(() => {

        if(window.innerWidth > 640) {
            setIsOpen(true)
        }

        const onResize = () => {
            if(window.innerWidth < 640) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }

        window.addEventListener("resize", onResize)

        return () => window.removeEventListener("resize", onResize)
    }, [])

    const jobStats = useMemo(() => {
        const countByStatus = {
            "applied": 0,
            "interview-scheduled": 0
        }
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
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="space-y-2"
                >
                    <div className="flex items-center justify-between space-x-4">
                        <h2 className="font-bold text-2xl mb-3 opacity-90">Application Stats</h2>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                {isOpen ? <ChevronsDownUp className="h-4 w-4" /> :<ChevronsUpDown className="h-4 w-4" />}
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div key={"applied"} className="flex justify-between items-center px-4 h-20 border rounded-xl">
                            <span className="font-semibold text-lg text-primary/95">{getStatus("applied")}</span>
                            <h2 className="text-4xl font-semibold opacity-90" style={{ color: `var(--${"applied"})` }}>{jobStats["applied"]}</h2>
                        </div>
                        <div key={"interview-scheduled"} className="flex justify-between items-center px-4 h-20 border rounded-xl">
                            <span className="font-semibold text-lg text-primary/95">{getStatus("interview-scheduled")}</span>
                            <h2 className="text-4xl font-semibold opacity-90" style={{ color: `var(--${"interview-scheduled"})` }}>{jobStats["interview-scheduled"]}</h2>
                        </div>
                    </div>
                    <CollapsibleContent className="grid grid-cols-2 gap-2 mb-2">
                        {Object.keys(jobStats)?.slice(2)?.map((status) => (
                            <div key={status} className="flex justify-between items-center px-4 h-20 border rounded-xl">
                                <span className="font-semibold text-lg text-primary/95">{getStatus(status)}</span>
                                {/* <h2 className="text-3xl font-semibold opacity-90 text-foreground/90">{jobStats[status]}</h2> */}
                                <h2 className="text-4xl font-semibold opacity-90" style={{ color: `var(--${status})` }}>{jobStats[status]}</h2>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>
        : null
    )
}

export default JobStats