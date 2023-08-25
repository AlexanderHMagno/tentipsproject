"use client";
import { useEffect, useState } from "react";
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
import { configCache } from "@/lib/api/helpers/connections";
import useSWR from "swr";

export default function LoveComponent({ id }: { id: string }) {
  return (
    <>
      <ShowComments />
      <ShowLove id={id} />
    </>
  );
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ShowLove({ id }: { id: string }) {
  const [like, setLikes] = useState(0);
  const { data, error, isLoading } = useSWR(
    `/api/entries/likes/${id}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading) {
      setLikes(data.likes);
    }
  }, [data, isLoading]);

  const handleLike = async () => {
    setLikes(like + 1);
    const data = await fetch(
      `/api/entries/likes/${id}`,
      configCache(3600, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
    );
  };

  return (
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
