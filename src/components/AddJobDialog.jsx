import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useAddJobMutation } from "@/services/jobsApi"
import { PiPlusCircle } from "react-icons/pi"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { status_timeline } from "../utils/constants"
import { Textarea } from "./ui/textarea"

const AddJobDialog = () => {

    const [open, setOpen] = useState(false)
    const [jobDetails, setJobDetails] = useState({})
    const [errMsg, setErrMsg] = useState("")

    const [addJob, {}] = useAddJobMutation()

    const handleOpenChange = (state) => {
        setJobDetails({})
        setOpen(state)
        setErrMsg("")
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

    const handleJobDescriptionChange = (e) => {
        setJobDetails({
            ...jobDetails,
            job_details: {
                ...(jobDetails.job_details ?? {}),
                job_description : e.target.value
            }
        })
    }

    const handleAddJob = async () => {
        console.log("job details ", jobDetails)
        try {
            const res = await addJob(jobDetails).unwrap()
            setJobDetails({})
            setErrMsg("")
            setOpen(false)
        } catch (error) {
            console.log("Add job error ", error)
            setErrMsg(error?.data?.message)
        }
    }

    return (
        <Dialog className="" open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <PiPlusCircle/>
                    <span className="hidden sm:inline">Add new job</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-9/12 md:max-w-6/12 md:min-w-5/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add new job</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input 
                            id="company_name"
                            name="company_name"
                            required
                            value={jobDetails.company_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_role">Job Role</Label>
                        <Input 
                            id="job_role"
                            name="job_role"
                            required
                            value={jobDetails.job_role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        {/* <Input 
                            id="status"
                            type="status"
                            name="status"
                            required
                            value={jobDetails.status}
                            onChange={handleInputChange}
                        /> */}
                        <Select onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select application status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {status_timeline?.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>{status.title}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_description">Job Description</Label>
                        <Textarea 
                            id="job_description"
                            name="job_description"
                            required
                            value={jobDetails?.job_details?.job_description}
                            onChange={handleJobDescriptionChange}
                            rows="5"
                            className="max-h-[100px]"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="job_location">Company Location</Label>
                        <Input 
                            id="job_location"
                            name="job_location"
                            required
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
                    <Button onClick={handleAddJob}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddJobDialog