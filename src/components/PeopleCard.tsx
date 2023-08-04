import { CalendarIcon } from "@radix-ui/react-icons"
import Image from "next/image"
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


type props = {
    name:String
}

export function PeopleCard({name} : props) {

    
    
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
       
        <div className="flex items-center">
        <Image 
          width={50}
          height={50}
          src="/images/alex.jpeg" 
          className="w-12 h-12 rounded-full mr-4" 
          alt="Emir Montano"/>
        <div className="text-xl font-bold">
          {name}
        </div>
     </div>
        </Button>
     
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/images/profile.jpeg" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{name}</h4>
            <p className="text-sm">
              The official information of this writer, check other post by these person! 
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
