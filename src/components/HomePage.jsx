import { PiPlus } from "react-icons/pi";
import { useGetAllJobsQuery } from "@/services/jobsApi"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import CustomTooltip from "./utils/CustomTooltip"
import AddJobDialog from "./AddJobDialog";
import AppliedJobs from "./AppliedJobs";
import UpcomingInterviews from "./UpcomingInterviews";
import JobStats from "./JobStats";

const HomePage = () => {

    const { data: jobs } = useGetAllJobsQuery()

    const {userDetails} = useSelector((state) => state.user)

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                <h1 className="font-bold text-3xl sm:text-4xl">{`Hello, ${userDetails?.name ?? 'user'}`}</h1>
                <span className="text-sm text-muted-foreground">{(new Date).toLocaleString()}</span>
                </div>
                <CustomTooltip tooltipText="Add new job">
                    <AddJobDialog />
                </CustomTooltip>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 sm:flex-nowrap">
                <div className="w-full sm:w-[400px] flex flex-col gap-y-4">
                    <UpcomingInterviews/>
                    <JobStats/>
                </div>
                <div className="grow">
                    <AppliedJobs/>
                </div>
            </div>
        </div>
    )
}

export default HomePage