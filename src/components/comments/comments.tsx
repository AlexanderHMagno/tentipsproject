"use client";
import { Types } from "mongoose";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import CommentForm from "./CommentArea";
import useSWR from "swr";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import AddSubComment from "./commentClient";
import { Icons } from "../icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Comments({
  id,
  initial,
}: {
  id: string;
  initial: boolean;
}) {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries/comments/${id}`,
    fetcher
  );

  const [openComment, setOpenComment] = useState(false);

  if (isLoading) return <Icons.spinner />;

  return (
    <div className="flex-col justify-around h-full w-full">
      <div className="overflow-x-scroll overflow-y-scroll h-4/5 ">
        {data.map((x: any) => (
          <CreateCard key={x._id} {...x} />
        ))}

        {!initial && (
          <div
            className=" float-right cursor-pointer duration-100"
            onClick={() => setOpenComment(!openComment)}
          >
            {!openComment && (
              <span className=" text-xs py-1 px-2 rounded-full">Comment</span>
            )}
            {openComment && <CrossCircledIcon className="text-red-600" />}
          </div>
        )}
      </div>
      <div className="">
        {(initial || openComment) && <CommentForm id={id} mutate={mutate} />}
      </div>
    </div>
  );
}

export function CreateCard({
  content,
  name,
  likes,
  _id,
}: {
  content: string;
  name: string;
  likes: number;
  _id: string;
}) {
  return (
    <Card className="my-1 w-full hover:border-gray-200 duration-300  dark:border-gray-900 ">
      <CardContent className="m-0 p-1 w-full">
        <div className="font-bold my-2 text-left">{name}</div>
        <div className=" break-words p-2 bg-gray-100 dark:bg-black text-xs">
          {content}
        </div>
      </CardContent>

      <div className="w-full">
        <AddSubComment id={_id} likes={likes} />
      </div>
    </Card>
  );
}
