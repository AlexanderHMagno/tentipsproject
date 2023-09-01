import { configCache } from "@/lib/api/helpers/connections";
import connect from "@/lib/utils/db";
import { CategoriesType } from "@/models/Categories";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Categories from "@/models/Categories";

export default async function HotCategories({ limit }: { limit: number }) {
  // const categories = await fetch(
  //   `${process.env.PROJECT_URL}/api/categories?limit=${limit}`,
  //   configCache(36000)
  // );

  // const data = await categories.json();
  await connect();

  const data = await Categories.find().limit(+limit);

  return (
    <>
      <ul className="flex flex-wrap mb-5">
        {data &&
          data.map((cat: CategoriesType, idx: number) => {
            return (
              <li className="ml-1" key={idx}>
                <Link
                  className=" whitespace-nowrap"
                  href={`/categories/${cat.title}`}
                >
                  <Badge
                    className="px-5 py-2 m-1 bg-slate-100 dark:bg-slate-800 border-0 hover:bg-brand"
                    variant={"outline"}
                  >
                    {cat.title}
                  </Badge>
                </Link>
              </li>
            );
          })}
      </ul>
      <span className="text-sm text-brand lg:ml-5">
        <Link href="/categories"> See more Topics </Link>
      </span>
    </>
  );
}
