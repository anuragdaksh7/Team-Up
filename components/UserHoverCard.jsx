import { CalendarIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"

export function getFirstLetters(str="Team Name") {
    // Split the string into an array of words
    const words = str.split(' ');

    // Extract the first letter of each word
    const firstLetters = words.map(word => word.charAt(0));

    // Join the first letters into a new string
    const result = firstLetters.join('').toUpperCase();

    return result;
}

export default function UserHoverCard(props) {
    const avatarText = getFirstLetters(props.userName);
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {/* <Button variant="link">@nextjs</Button> */}
                {
                    props.lead ? <Link href={props.Uhref} className=" text-red-500 ps-2">
                        {props.userName}
                    </Link> : <Link href={props.Uhref} className=" ps-2">
                        {props.userName}
                    </Link>
                }
            </HoverCardTrigger>
            <HoverCardContent className=" z-10 w-fit">
                <div className="flex gap2 space-x-4">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{avatarText}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-blue-500 text-left">@{props.lead?"Leader":"Member"}</h4>
                        <div className="flex items-center pt-2 text-blue-500">
                            <EnvelopeOpenIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground text-blue-500">
                                 {props.email}
                            </span>
                        </div>
                        {/* <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined December 2021
                            </span>
                        </div> */}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
