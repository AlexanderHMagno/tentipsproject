"use client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { HeartFilledIcon, KeyboardIcon } from "@radix-ui/react-icons";

export default function LoveComponent({
  likes,
  id,
}: {
  likes: number;
  id: string;
}) {
  const [like, setLikes] = useState(likes);

  const handleLike = async () => {
    const data = await fetch(`/api/entries/likes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    setLikes(like + 1);
  };

  return (
    <>
      <ShowComments />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center" onClick={handleLike}>
              <HeartFilledIcon className="text-brand w-[20px] h-[20px] mr-1"></HeartFilledIcon>
              <span>{like}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100 rounded">
            <p>Show your love</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

function ShowComments() {
  return (
    <Sheet>
      <SheetTrigger>
        <KeyboardIcon className="w-[20px] h-[20px] mr-10" />
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Comment</SheetTitle>
          <SheetDescription>
            <h1 className="font-bold text-3xl mb-10">Comming soon</h1>
            Would you like to comment? Please create an account to add your
            comments!
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
