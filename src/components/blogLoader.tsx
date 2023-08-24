"use client";
import { Button } from "./ui/button";
import EntryCard from "./EntryCard";
import { useSpring, animated } from "@react-spring/web";
import { generateRandomUI } from "@/lib/functions";

import { useState } from "react";
import useSWR from "swr";

export default function BlogLoader() {
  const [pos, setPos] = useState<number>(0);

  const pages = [];

  for (let i = 0; i < pos; i++) {
    pages.push(<Page index={i} key={generateRandomUI()} />);
  }

  return (
    <>
      {pages}
      <div className="w-full h-full  flex items-end">
        <Button
          onClick={(e) => setPos(1 + pos)}
          className="bg-brand text-white hover:bg-brand3 w-full"
        >
          Load More
        </Button>
      </div>
    </>
  );
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Page(params: { index: number }) {
  const { index } = params || {};

  const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries?pos=${
    index + 1
  }`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: [{ opacity: 0.7 }, { opacity: 0.8 }, { opacity: 1 }],
    }),
    []
  );
  return (
    data &&
    data.map((elem: any, idx: number) => (
      <animated.span style={props} key={elem.id + generateRandomUI()}>
        <EntryCard elem={elem} lazy />
      </animated.span>
    ))
  );
}
