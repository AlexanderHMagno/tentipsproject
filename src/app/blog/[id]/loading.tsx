import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <article className="p-5 mb-32 w-full lg:max-w-4xl m-auto">
        <div className="mb-10">
          <Skeleton className="bg-gray-200  m-auto h-[200px] w-full"></Skeleton>
        </div>

        <div className="mb-5 flex items-center ml-5">
          <Skeleton className="bg-gray-200  h-[40px] w-[40px] rounded-full"></Skeleton>
          <Skeleton className="bg-gray-200  h-[30px] w-[150px] ml-5"></Skeleton>
          <Skeleton className="bg-gray-200  h-[20px] w-[100px] ml-5"></Skeleton>
        </div>

        <div>
          <Skeleton className="bg-gray-200  m-auto h-[400px] w-full"></Skeleton>
        </div>
      </article>
    </>
  );
};

export default Loading;
