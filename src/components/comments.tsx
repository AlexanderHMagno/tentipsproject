import { Types } from "mongoose";
import CommentForm from "./CommentArea";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { HeartFilledIcon, KeyboardIcon } from "@radix-ui/react-icons";
import { configCache } from "@/lib/api/helpers/connections";

export default async function Comments({ id }: { id: Types.ObjectId }) {
  const commentsAll = await fetch(
    `${process.env.PROJECT_URL}/api/entries/comments/${id.toString()}`,
    configCache()
  );

  const data = await commentsAll.json();

  return (
    <Sheet>
      <SheetTrigger>
        <KeyboardIcon className="w-[20px] h-[20px] mr-10" />
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-black">
        <SheetHeader>
          <SheetDescription className="h-[100vh]">
            <CommentForm id={id.toString()} />
            <div className="mt-5 overflow-x-scroll overflow-y-scroll h-4/6">
              {data.map((x: any) => (
                <CreateCard key={x._id} {...x} />
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export function CreateCard({
  content,
  name,
  likes,
}: {
  content: string;
  name: string;
  likes: number;
}) {
  return (
    <Card className="my-1 border-gray-100 dark:border-gray-900">
      <CardContent className="m-0 p-1 w-full">
        <div className="font-bold my-2">{name}</div>
        <div className="w-full p-2 bg-gray-100 dark:bg-black">{content}</div>
      </CardContent>
      <CardFooter className="flex justify-end items-center mb-0 pb-0">
        <span className="flex items-center">
          <HeartFilledIcon className="text-brand" /> {likes}
        </span>
        <span className="flex items-center ml-5">
          <KeyboardIcon />
        </span>
      </CardFooter>
    </Card>
  );
}
