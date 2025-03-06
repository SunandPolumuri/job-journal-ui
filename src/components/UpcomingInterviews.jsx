import { useGetAllJobsQuery } from "@/services/jobsApi"
import { Card, CardContent } from "./ui/card"
import { PiCaretLeft } from "react-icons/pi";
import { PiCaretRight } from "react-icons/pi";
import { PiVideoCamera } from "react-icons/pi"
import { PiCalendarDots } from "react-icons/pi";
import { useState } from "react";

const UpcomingInterviews = () => {

    const [activeIndex, setActiveIndex] = useState(1)

    const { data } = useGetAllJobsQuery()

    let dateTime = new Date()

    const handlePrev = () => {
        if(activeIndex > 0) {
            setActiveIndex(activeIndex - 1)
        }
    }

    const handleNext = () => {
        if(activeIndex + 1 < data?.length) {
            setActiveIndex(activeIndex + 1)
        }
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-3 opacity-90">Upcoming Interviews</h2>
            <div className="relative flex items-center">
                {activeIndex > 0 && 
                    <span onClick={handlePrev} className="absolute opacity-55 text-2xl -left-2 cursor-pointer hover:scale-150 hover:font-bold hover:opacity-100 transition-all">
                        <PiCaretLeft/>
                    </span>
                }
                <Card className="w-full">
                    <CardContent className="flex justify-between items-center gap-x-5">
                        <div className="flex flex-col min-w-0 gap-y-2">
                            <h2 className="font-semibold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{data?.[activeIndex]?.company_name}</h2>
                            <span className="text-primary/75 text-sm">{dateTime.toLocaleString()}</span>
                            <div className="text-sm flex gap-x-1 text-muted-foreground items-center cursor-pointer hover:underline hover:text-primary">
                                <PiVideoCamera/>
                                <span>Join</span>
                            </div>
                        </div>
                        <div className="self-start mt-1">
                            <PiCalendarDots size={28} />
                        </div>
                    </CardContent>
                </Card>
                {activeIndex < (data?.length - 1) && 
                    <span onClick={handleNext} className="absolute opacity-55 text-2xl -right-2 cursor-pointer hover:scale-150 hover:font-bold hover:opacity-100 transition-all">
                        <PiCaretRight/>
                    </span>
                }
            </div>
        </div>
    )
}

export default UpcomingInterviews