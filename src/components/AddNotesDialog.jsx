import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { PiPencilSimple } from "react-icons/pi"
import { useUpdateStatusMutation } from "@/services/jobsApi"
import { Textarea } from "./ui/textarea"

const AddNotesDialog = ({ status }) => {

    const [open, setOpen] = useState(false)
    const [notes, setNotes] = useState({
        additional_info: status?.additional_info ?? {}
    })

    const [updateStatus] = useUpdateStatusMutation()

    const handleNotesChange = (e) => {
        setNotes({
            additional_info: {
                ...notes.additional_info,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleUpdateStatus = async () => {
        try {
            const res = await updateStatus({statusId: status.status_id, payload: notes}).unwrap()
            handleOpenChange(false)
        } catch (error) {
            console.log("Error adding status ", error)
        }
    }

    const handleOpenChange = (state) => {
        setNotes({
            additional_info: status?.additional_info ?? {}
        })
        setOpen(state)
    }

    return (
        <Dialog className="" open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PiPencilSimple />
                    <span>Add notes</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-9/12 md:max-w-6/12 md:min-w-5/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add Notes</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea 
                            id="notes"
                            name="notes"
                            value={notes.additional_info?.notes ?? ""}
                            onChange={handleNotesChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={!notes.additional_info?.notes} onClick={handleUpdateStatus}>Add status</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNotesDialog