import { Card, CardContent, CardHeader } from "./ui/card"
import { PiMapPin } from "react-icons/pi"
import REACT_ICON from "../assets/react.svg"

const JobCard = ({ job = {} }) => {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-3 min-w-0">
                        <img src={REACT_ICON} className="h-12 w-12" alt="job_icon"/>
                        <div className="flex flex-col min-w-0">
                            <h2 className="font-semibold text-xl whitespace-nowrap overflow-hidden text-ellipsis">{job?.company_name}</h2>
                            <span className="text-primary/75 text-base">{job?.job_role}</span>
                            {job?.job_location && <div className="text-xs mt-1 flex gap-x-0.5 items-center"> 
                                <PiMapPin className=""/>
                                <span className="text-muted-foreground">{job.job_location}</span>
                            </div>}
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-semibold text-base">{job?.status}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JobCard