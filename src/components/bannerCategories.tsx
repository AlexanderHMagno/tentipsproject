import { configCache } from "@/lib/api/helpers/connections";
import { CategoriesType } from "@/models/Categories";
import Link from "next/link";
import connect from "@/lib/utils/db";
import Categories from "@/models/Categories";

export default async function BannerCategories() {
  // const categories = await fetch(
  //   `${process.env.PROJECT_URL}/api/categories`,
  //   configCache(36000)
  // );

  // const data = await categories.json();
  await connect();

  const data = await Categories.find().sort("title");

  return (
    <div className=" w-full bg-white dark:bg-black ">
      <ul className=" z-10 w-full md:w-[80%] m-auto  pb-4 opacity-100 md:opacity-30 ease-in md:duration-700 hover:opacity-100 hover:text-black dark:hover:text-white flex overflow-hidden hover:overflow-scroll   text-gray-400">
        {data.map((cat: CategoriesType, idx: number) => {
          return (
            <li className="text-xs ml-10 hover:text-brand" key={idx}>
              <Link
                className=" whitespace-nowrap"
                href={`/categories/${cat.title}`}
              >
                {cat.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
