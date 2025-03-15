import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PiNotePencil } from "react-icons/pi";
import { useUpdateJobMutation } from "@/services/jobsApi"

const EditJobDialog = ({ jobId, job }) => {

    const [open, setOpen] = useState(false)
    const [jobDetails, setJobDetails] = useState({
        company_name: job?.company_name,
        job_role: job?.job_role,
        job_location: job?.job_location,
        job_platform: job?.job_platform,
        job_link: job?.job_link,
    })
    const [errMsg, setErrMsg] = useState("")

    const [updateJob] = useUpdateJobMutation()

    const handleOpenChange = (state) => {
        setJobDetails({
            company_name: job?.company_name,
            job_role: job?.job_role,
            job_location: job?.job_location,
            job_platform: job?.job_platform,
            job_link: job?.job_link,
        })
        setOpen(state)
    }

    const handleInputChange = (e) => {
        setJobDetails({
            ...jobDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleStatusChange = (selectedStatus) => {
        setJobDetails({
            ...jobDetails,
            status: selectedStatus
        })
    }

    const handleUpdateJob = async () => {
        console.log("job details ", jobDetails)
        if(!jobId) return
        try {
            const res = await updateJob({jobId: jobId, payload: jobDetails}).unwrap()
            setErrMsg("")
            setOpen(false)
        } catch (error) {
            console.log("Error updating job ", error?.data?.message)
            setErrMsg(error?.data?.message)
        }
    }

    return (
        <Dialog className="" open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {/* <Button size="sm"> */}
                    <div className="flex items-center gap-x-0.5 cursor-pointer hover:text-primary">
                        <PiNotePencil/>
                        <span>Edit <span className="hidden sm:inline">details</span></span>
                    </div>
                {/* </Button> */}
            </DialogTrigger>
            <DialogContent className="min-w-9/12 md:max-w-6/12 md:min-w-5/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Edit job details</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input 
                            id="company_name"
                            name="company_name"
                            value={jobDetails.company_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_role">Job Role</Label>
                        <Input 
                            id="job_role"
                            name="job_role"
                            value={jobDetails.job_role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_location">Company Location</Label>
                        <Input 
                            id="job_location"
                            name="job_location"
                            value={jobDetails.job_location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_platform">Job Platform</Label>
                        <Input 
                            id="job_platform"
                            name="job_platform"
                            value={jobDetails.job_platform}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_link">Company Link</Label>
                        <Input 
                            id="job_link"
                            name="job_link"
                            value={jobDetails.job_link}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {errMsg && <span className="text-sm text-red-500">{errMsg}</span>}
                <DialogFooter>
                    <Button onClick={handleUpdateJob}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditJobDialog