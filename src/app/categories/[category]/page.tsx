import EntryCard from "@/components/EntryCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import STR from "@supercharge/strings";
import { configCache } from "@/lib/api/helpers/connections";

const getData = async (category: string) => {
  const data = await fetch(
    `${process.env.PROJECT_URL}/api/categories/${category}`,
    configCache()
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
            {STR(decodeURI(params.category)).ucFirst().get()}
            <Link href="/categories">
              <Badge variant="outline">Display All</Badge>
            </Link>
          </h2>

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((elem: any, idx: number) => (
              <span key={elem._id}>
                <EntryCard elem={elem} lazy={idx > 10} />
              </span>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
