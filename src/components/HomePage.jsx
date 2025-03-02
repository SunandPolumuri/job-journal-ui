import { PiPlus } from "react-icons/pi";
import { useGetAllJobsQuery } from "@/services/jobsApi"
import { useSelector } from "react-redux"
import { Button } from "./ui/button"
import CustomTooltip from "./utils/CustomTooltip"
import AddJobDialog from "./AddJobDialog";

const HomePage = () => {

    const { data: jobs } = useGetAllJobsQuery()

    const {userDetails} = useSelector((state) => state.user)

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl">{`Hello ${userDetails?.name ?? 'user'}`}</h1>
                <CustomTooltip tooltipText="Add new job">
                    {/* <Button size="sm">
                        <PiPlus/>
                        <span className="">Add new job</span>
                    </Button> */}
                    <AddJobDialog></AddJobDialog>
                </CustomTooltip>
            </div>
            {jobs?.map((job) => (
                <>{job.company_name}</>
            ))}
        </div>
    )
}

export default HomePage