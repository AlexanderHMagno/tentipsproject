import { configCache } from "@/lib/api/helpers/connections";
import { CategoriesType } from "@/models/Categories";
import Link from "next/link";

export default async function BannerCategories() {
  const categories = await fetch(
    `${process.env.PROJECT_URL}/api/categories`,
    configCache(36000)
  );

  const data = await categories.json();

  console.log(data);

  return (
    <ul className="w-[80%] m-auto pb-5 opacity-100 md:opacity-0 ease-in duration-300 hover:opacity-100 flex overflow-hidden hover:overflow-scroll  top-20 text-gray-400">
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
