import { useMemo, useState } from "react"
import { PiPlusCircle } from "react-icons/pi"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { status_timeline } from "@/utils/constants"
import { Input } from "./ui/input"
import { useAddStatusMutation } from "@/services/jobsApi"
import { isFinalStatusUpdate } from "@/utils/utils"
import { DateTimePicker } from "./DateTimePicker"
import { Textarea } from "./ui/textarea"

const AddStatusUpdateButton = ({ currentStatus, jobId }) => {

    const [open, setOpen] = useState(false)
    const [newStatus, setNewStatus] = useState({
        status: '',
        additional_info: {}
    })
    const [errMsg, setErrMsg] = useState("")

    const [addStatus] = useAddStatusMutation()

    const filteredStatusOptions = useMemo(() => {
        if(isFinalStatusUpdate(currentStatus)) return []

        const sliceIndex = status_timeline.findIndex((item, index) => item.value === currentStatus)
        return status_timeline.slice(sliceIndex+1)
    }, [currentStatus])

    const handleStatusChange = (selectedStatus) => {
        setNewStatus({
            status: selectedStatus,
            additional_info: {}
        })
    }

    const handleAdditionalInfoChange = (e) => {
        setNewStatus({
            ...newStatus,
            additional_info: {
                ...newStatus.additional_info,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleInterviewDateChange = (date) => {
        setNewStatus({
            ...newStatus,
            additional_info: {
                ...newStatus.additional_info,
                interview_date: date
            }
        })
    }

    const handleAddStatus = async () => {
        try {
            const res = await addStatus({jobId: jobId, payload: newStatus}).unwrap()
            setErrMsg("")
            handleOpenChange(false)
        } catch (error) {
            console.log("Error adding status ", error)
            setErrMsg(error?.data?.message)
        }
    }

    const handleOpenChange = (state) => {
        setNewStatus({
            status: '',
            additional_info: {}
        })
        setErrMsg("")
        setOpen(state)
    }

    return (
        <Dialog className="" open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="cursor-pointer flex items-center">
                    <Button className="size-10 rounded-full cursor-pointer">
                        <PiPlusCircle className="size-6"/>
                    </Button>
                    <span className="ml-4 font-medium text-primary/80 hover:text-primary">Add status update</span>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-9/12 md:max-w-6/12 md:min-w-5/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add status update</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={handleStatusChange} value={newStatus.status}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select application status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filteredStatusOptions?.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>{status.title}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {newStatus?.status === "interview-scheduled" && 
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="interview_date">Interview Date</Label>
                                <DateTimePicker handleDateChange={handleInterviewDateChange}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="interview_link">Interview Link</Label>
                                <Input 
                                    id="interview_link"
                                    name="interview_link"
                                    value={newStatus.additional_info?.interview_link ?? ""}
                                    onChange={handleAdditionalInfoChange}
                                />
                            </div>
                        </>
                    }
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea 
                            id="notes"
                            name="notes"
                            value={newStatus.additional_info?.notes ?? ""}
                            onChange={handleAdditionalInfoChange}
                        />
                    </div>
                </div>
                {errMsg && <span className="text-sm text-red-500">{errMsg}</span>}
                <DialogFooter>
                    <Button onClick={handleAddStatus} disabled={!newStatus.status}>Add status</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddStatusUpdateButton