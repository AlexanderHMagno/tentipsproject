import { KeyboardIcon } from "@radix-ui/react-icons";
import Comments from "./comments/comments";
import ShowLove from "./loves";
import { Types } from "mongoose";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ActionsComponent({ id }: { id: string }) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <KeyboardIcon className="w-[20px] h-[20px] mr-10" />
        </SheetTrigger>
        <SheetContent className="bg-white dark:bg-black h-[100vh]">
          <Comments id={id} />
        </SheetContent>
      </Sheet>
      <ShowLove id={id} />
    </>
  );
}
