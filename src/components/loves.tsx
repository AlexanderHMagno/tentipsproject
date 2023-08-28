"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { HeartFilledIcon } from "@radix-ui/react-icons";
import { configCache } from "@/lib/api/helpers/connections";
import useSWR from "swr";
import GenerateAlert from "./generateAlertLogin";

export default function LoveComponent({ id }: { id: string }) {
  return <ShowLove id={id} />;
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

    const info = await data.json();

    setLikes(info.likes);
  };

  return (
    <GenerateAlert>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center" onClick={handleLike}>
              <HeartFilledIcon className="text-brand w-[20px] h-[20px] mr-1"></HeartFilledIcon>
              <span>{like}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100 rounded dark:bg-black">
            <p>Show your love</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </GenerateAlert>
  );
}
