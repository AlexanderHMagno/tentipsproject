"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { capitalize } from "@/lib/functions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Categories() {
  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/categories`,
    fetcher
  );

  console.log(data);
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
              className="rounded-3xl border-gray-0 bg-gray-100 hover:bg-gray-300 px-5 dark:text-black"
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <section className=" text-center">
          <h2 className="mb-12 text-center text-3xl font-bold">Topics</h2>

          <div className=" grid grid-cols-2 lg:grid-cols-4 text-left ">
            {data &&
              data
                .filter((elem: any) => {
                  if (!search) return true;

                  const subgroup = elem.group;

                  const answer = subgroup.some((elem: string) =>
                    elem.toLowerCase().includes(search.toLowerCase())
                  );

                  const title = elem.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

                  return answer || title;
                })
                .map((elem: any, idx: number) => (
                  <div key={elem._id} className="my-2">
                    <Link href={`categories/${elem.title}`}>
                      <h3 className="text-lg  font-bold underline-offset-2 underline">
                        {elem.title}
                      </h3>
                    </Link>
                    <ul className="ml-1">
                      {elem.group &&
                        elem.group
                          .filter((subTag: string) => {
                            if (!search) return true;
                            return subTag
                              .toLowerCase()
                              .includes(search.toLowerCase());
                          })
                          .map((subTag: string, idx: number) => (
                            <li key={idx}>
                              <Link href={`categories/${subTag}`}>
                                <Badge>{capitalize(subTag)}</Badge>
                              </Link>
                            </li>
                          ))}
                    </ul>
                  </div>
                ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
