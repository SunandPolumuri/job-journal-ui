import { useState } from "react"
import { isFinalStatusUpdate, getStatus } from "@/utils/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Button } from "./ui/button"
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react"
import AddNotesDialog from "./AddNotesDialog"
import { format } from "date-fns"

const StatusTimelineElement = ({ status }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div key={status?.status} className="flex gap-x-5 min-h-20">
            <div className="flex flex-col items-center">
                <div className="size-10 rounded-full border-4 border-foreground" style={{ backgroundColor: `var(--${status?.status ?? "default"})` }}></div>
                {!isFinalStatusUpdate(status?.status) && <div className="w-2 grow my-2 rounded-md" style={{ backgroundColor: `var(--${status?.status ?? "default"})` }}></div>}
            </div>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-2 pb-3 grow"
            >
                <div className="flex items-center justify-between space-x-4">
                    <div>
                        <div className="font-semibold text-2xl">{getStatus(status?.status)}</div>
                        {status?.created_at && <span className="text-primary/75 text-xs">{format(status?.created_at, "PPpp")}</span>}
                    </div>
                    <CollapsibleTrigger asChild className="self-start">
                        <Button variant="ghost" size="sm">
                            {isOpen ? <ChevronsDownUp className="h-4 w-4" /> :<ChevronsUpDown className="h-4 w-4" />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    {status?.additional_info?.notes ?
                        <>
                            <h2 className="font-semibold">Notes</h2>
                            <p className="text-primary/75">{status?.additional_info?.notes}</p>
                        </> 
                        : 
                        <AddNotesDialog status={status}/>
                    }
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export default StatusTimelineElement