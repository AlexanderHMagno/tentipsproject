import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { parseISO, format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type props = {
  id: string;
};

const getData = async (entry: string) => {
  const data = await fetch(`http://localhost:3000/api/user/${entry}`);
  return data.json();
};

export async function PeopleCard({ id }: props) {
  const data = await getData(id);
  const { image, name, last, bio, start } = data;
  const date = parseISO(start);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src={`/images/profile/${image}`}
              className="w-12 h-12 rounded-full mr-4"
              alt={`image of ${name} ${last}`}
            />
            <div className="text-xl font-bold">
              {name} {last}
            </div>
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white dark:bg-black">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={`/images/profile/${image}`} />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{name}</h4>
            <p className="text-sm">{bio}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                <time dateTime={start}>{format(date, "LLLL d, yyyy")}</time>
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
