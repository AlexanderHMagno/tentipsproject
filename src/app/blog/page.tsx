import EntryCard from "@/components/EntryCard";
import BlogLoader from "@/components/blogLoader";
import { configCache } from "@/lib/api/helpers/connections";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Trending from "@/components/trending/Trending";

const getData = async () => {
  const data = await fetch(
    `${process.env.PROJECT_URL}/api/entries`,
    configCache()
  );

  if (!data.ok) {
    return new Promise<any>((resolve, reject) => resolve([]));
  }

  return data.json();
};

export default async function Blog() {
  const data = await getData();

  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <Trending limit={6} />
          <Separator className="my-5 bg-gray-100 dark:bg-gray-950" />
          <div className="md:grid md:grid-cols-6">
            <div className="col-span-4">
              <div className="md:grid md:gap-x-6 md:grid-cols-3   h-auto">
                {data.map((elem: any, idx: number) => (
                  <span key={elem._id}>
                    <EntryCard elem={elem} lazy={idx > 10} />
                  </span>
                ))}

                <BlogLoader />
              </div>
            </div>
            <div className="hidden md:grid col-span-2 border-10 border-gray-900"></div>
          </div>
        </section>
      </div>
    </>
  );
}
