"use client";
import { Types } from "mongoose";
import CommentForm from "./CommentArea";
import useSWR from "swr";

import { Card, CardContent } from "@/components/ui/card";

import AddSubComment from "./commentClient";
import { Icons } from "../icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Comments({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries/comments/${id}`,
    fetcher
  );

  if (isLoading) return <Icons.spinner />;

  return (
    <div>
      <CommentForm id={id} mutate={mutate} />
      <div className="mt-5 overflow-x-scroll overflow-y-scroll h-4/6">
        {data.map((x: any) => (
          <CreateCard key={x._id} {...x} />
        ))}
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
    <Card className="my-1 border-gray-100 dark:border-gray-900">
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
