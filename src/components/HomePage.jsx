import { PiPlus } from "react-icons/pi";
import { useGetAllJobsQuery } from "@/services/jobsApi"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import CustomTooltip from "./utils/CustomTooltip"
import AddJobDialog from "./AddJobDialog";
import AppliedJobs from "./AppliedJobs";

const HomePage = () => {

    const { data: jobs } = useGetAllJobsQuery()

    const {userDetails} = useSelector((state) => state.user)

    return (
        <div className="p-4">
            <div className="flex justify-between mb-2">
                <h1 className="font-bold text-3xl sm:text-4xl">{`Welcome ${userDetails?.name ?? 'user'}`}</h1>
                <CustomTooltip tooltipText="Add new job">
                    <AddJobDialog />
                </CustomTooltip>
            </div>
            <AppliedJobs/>
        </div>
    )
}

export default HomePage