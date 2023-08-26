"use client";
import {
  KeyboardIcon,
  HeartFilledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Comments from "./comments";
import { Types } from "mongoose";

export default function AddSubComment({
  id,
  likes,
}: {
  id: string;
  likes: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex-col">
      <div className="flex w-full justify-end px-2 items-center">
        <span className="flex items-center mr-5">
          <HeartFilledIcon className="text-brand" /> {likes}
        </span>
        {open ? (
          <CrossCircledIcon
            className="text-red-600"
            onClick={() => setOpen(false)}
          />
        ) : (
          <KeyboardIcon onClick={() => setOpen(true)} />
        )}
      </div>

      {open && (
        <div className="w-[90%] m-auto">
          <Comments id={new Types.ObjectId(id)} />
        </div>
      )}
    </div>
  );
}
