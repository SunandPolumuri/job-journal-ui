import { useGetUpcomingInterviewsQuery } from "@/services/jobsApi"
import { Card, CardContent } from "./ui/card"
import { PiVideoCamera } from "react-icons/pi"
import { PiCalendarDots } from "react-icons/pi";
import NotesDialog from "./NotesDialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { format } from "date-fns";

const UpcomingInterviews = () => {

    const { data, isLoading } = useGetUpcomingInterviewsQuery(undefined, { refetchOnMountOrArgChange: true })

    const getDate = (date) => {
        if(!date) return ''
        const interviewDate = format(date, "PPpp")
        return interviewDate
    }

    const getInterviewLink = (link) => {
        if (!link) {
            return null
        }

        return (
            <a className="flex gap-x-1 items-center cursor-pointer hover:underline hover:text-primary" href={link ?? "#"} target="_blank" rel="noreferrer nofollow">
                <PiVideoCamera/>
                <span className="ml-0.5">Join</span>
            </a>
        )
    }

    return (
        (!isLoading && data?.length > 0) ?
            <div>
                <h2 className="font-bold text-2xl mb-3 opacity-90">Upcoming Interviews</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {data?.map((item, index) => (
                            <CarouselItem key={index}>
                                <Card className="w-full">
                                    <CardContent className="flex justify-between items-center gap-x-5">
                                        <div className="flex flex-col min-w-0 gap-y-2">
                                            <h2 className="font-semibold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{item?.company_name}</h2>
                                            {item?.additional_info?.interview_date &&
                                                <span className="text-primary/75 text-sm">{getDate(item?.additional_info?.interview_date)}</span>
                                            }
                                            <div className="flex gap-x-3 text-sm text-muted-foreground">
                                                {item?.additional_info?.interview_link &&
                                                    getInterviewLink(item?.additional_info?.interview_link)
                                                }
                                                <NotesDialog notes={item?.additional_info?.notes} />
                                            </div>
                                        </div>
                                        <div className="self-start mt-1">
                                            <PiCalendarDots size={28} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-3"/>
                    <CarouselNext className="-right-3"/>
                </Carousel>
            </div> 
        : null
        
    )
}

export default UpcomingInterviews