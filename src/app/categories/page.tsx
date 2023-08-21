"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { useState } from "react";
import { Icons } from "@/components/icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Categories() {
  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/categories`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left mb-12">
          <h1 className="mb-12 text-center text-3xl font-bold">
            Explore topics{" "}
            <Icons.search className="inline-block mr-2 h-4 w-4" />
          </h1>

          <div className="flex m-auto w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search"
              className="rounded-3xl border-gray-0 bg-gray-100 hover:bg-gray-300 px-5"
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">Topics</h2>

          <div className=" grid grid-cols-2 lg:grid-cols-4 text-center">
            {data.map((elem: any, idx: number) => (
              <Link href={`categories/${elem.title}`} key={elem._id}>
                <Badge
                  className={`
                  ${
                    search &&
                    elem.title.toLowerCase().includes(search.toLowerCase())
                      ? "bg-teal-500"
                      : ""
                  }
                  hover:bg-orange-500 m-2`}
                >
                  {elem.title}
                </Badge>
              </Link>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
