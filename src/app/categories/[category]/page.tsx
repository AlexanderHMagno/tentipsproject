import EntryCard from "@/components/EntryCard";
import AdsenseClient from "@/components/adSense";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const getData = async (category: string) => {
  const data = await fetch(
    `${process.env.PROJECT_URL}/api/categories/${category}`,
    {
      cache: "no-cache",
    }
  );

  if (!data.ok) {
    return new Promise((resolve, reject) => resolve([]));
  }

  return data.json();
};

export default async function Blog({ params }: any) {
  const data = await getData(params.category);

  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold flex flex-col items-center justify-center">
            {decodeURI(params.category)}
            <Link href="/categories">
              <Badge variant="outline">Display All</Badge>
            </Link>
          </h2>

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((elem: any, idx: number) => (
              <span key={elem._id}>
                <EntryCard elem={elem} />
                {idx % 10 == 0 ?? <AdsenseClient />}
              </span>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
