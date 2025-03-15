import { DialogDescription } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { PiNote } from "react-icons/pi"

const NotesDialog = ({ notes }) => {

    if(!notes) {
        return null
    }

    return (
        <Dialog className="gap-2">
            <DialogTrigger asChild>
                <div className="cursor-pointer flex items-center">
                    <div className="flex items-center gap-x-0.5 cursor-pointer hover:text-primary">
                        <PiNote />
                        <span className="ml-0.5">View notes</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="gap-2 min-w-9/12 mb-2 md:max-w-6/12 md:min-w-5/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Notes</DialogTitle>
                </DialogHeader>
                <DialogDescription/>
                <p>{notes}</p>
            </DialogContent>
        </Dialog>
    )
}

export default NotesDialog