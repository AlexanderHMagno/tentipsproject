import { configCache } from "@/lib/api/helpers/connections";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Entries from "@/models/Entries";
import connect from "@/lib/utils/db";

const getData = async (limit: number) => {
  // const data = await fetch(
  //   `${process.env.PROJECT_URL}/api/entries?trending=true&limit=${limit}`,
  //   configCache()
  // );

  // if (!data.ok) {
  //   return new Promise<any>((resolve, reject) => resolve([]));
  // }

  // return data.json();
  await connect();
  return await Entries.find()
    .select("-content")
    .sort({ likes: "desc" })
    .limit(limit);
};

export default async function Trending({
  limit = 6,
  title = true,
}: {
  limit: number;
  title: boolean;
}) {
  const data = await getData(limit);

  return (
    <div>
      {title && (
        <h2 className="mb-5 text-left text-lg font-bold  flex items-center">
          <Image
            src={"/images/logo-solo.png"}
            width={20}
            height={50}
            alt={"logo"}
            className="inline"
          />{" "}
          Trending on 10 Tips:
        </h2>
      )}
      <div className="md:grid md:gap-x-6 md:grid-cols-3 px-10  h-auto">
        {data.map((elem: any, idx: number) => (
          <span key={elem._id}>
            <TrendingCard elem={elem} idx={idx} />
          </span>
        ))}
      </div>
    </div>
  );
}

function TrendingCard({ elem, idx }: { elem: any; idx: number }) {
  // const date = parseISO(elem.createdAt.toString());
  // console.log(elem.createdAt, date);
  return (
    <div className="flex align-baseline md:block mb-5 pb-2 lg:mb-10 border-b-slate-50 dark:border-gray-900 border-b-2 sm:border-b-0">
      <div>
        <Link href={`/blog/${elem._id}`}>
          <div className="flex text-left">
            <span className="text-3xl  opacity-80 mr-7 text-gray-300">
              {idx + 1}
            </span>
            <div>
              <h3 className="font-bold">{elem.title}</h3>
              <div>
                <span className="text-xs lg:text-sm flex">
                  <time dateTime={elem.createdAt}></time>
                  <span className="flex items-center ml-5">
                    {elem.likes} <HeartFilledIcon className="text-brand" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
