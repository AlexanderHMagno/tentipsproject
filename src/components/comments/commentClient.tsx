"use client";
import {
  KeyboardIcon,
  HeartFilledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Comments from "./comments";

import { configCache } from "@/lib/api/helpers/connections";

export default function AddSubComment({
  id,
  likes,
}: {
  id: string;
  likes: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [numLikes, setNumLikes] = useState<number>(likes);

  const handleHeart = async () => {
    const update = await fetch(
      `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries/comments/${id}`,
      configCache(3600, {
        method: "POST",
        body: JSON.stringify({
          action: "like",
        }),
      })
    );

    const data = await update.json();
    setNumLikes(data.likes);
  };

  return (
    <div className="flex-col">
      <div className="flex w-full justify-end px-2 items-center">
        <span className="flex items-center mr-5">
          <HeartFilledIcon
            className="text-brand"
            cursor={"pointer"}
            onClick={handleHeart}
          />{" "}
          {numLikes}
        </span>
        {open ? (
          <CrossCircledIcon
            className="text-red-600"
            onClick={() => setOpen(false)}
          />
        ) : (
          <KeyboardIcon cursor={"pointer"} onClick={() => setOpen(true)} />
        )}
      </div>

      {open && (
        <div className="w-[95%] mx-2 m-auto">
          <Comments id={id} initial={false} />
        </div>
      )}
    </div>
  );
}
