import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const CustomTooltip = ({children, ...props}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{props.tooltipText ?? ""}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip