import { configCache } from "@/lib/api/helpers/connections";
import { CategoriesType } from "@/models/Categories";
import Link from "next/link";
import axios from "axios";

export default async function BannerCategories() {
  let data: any = [];

  try {
    const categories = await fetch(
      `${process.env.PROJECT_URL}/api/categories`,
      configCache(36000)
    );

    data = await categories.json();
  } catch (e) {}

  return (
    <ul className="bg-white dark:bg-black md:bg-transparent hover:bg-white black:hover:bg-black z-10 w-full md:w-[80%] m-auto pb-5 opacity-100 md:opacity-0 ease-in md:duration-300 hover:opacity-100 hover:text-black dark:hover:text-white flex overflow-hidden hover:overflow-scroll  top-20 text-gray-400">
      {data.map((cat: CategoriesType, idx: number) => {
        return (
          <li className=" ml-10" key={idx}>
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
  );
}
