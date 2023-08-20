import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const getData = async () => {
  const data = await fetch(`${process.env.PROJECT_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!data.ok) {
    return new Promise((resolve, reject) => resolve([]));
  }

  return data.json();
};

export default async function Categories() {
  const data = await getData();

  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">Categories</h2>

          <div className="">
            {data.map((elem: any, idx: number) => (
              <Link href={`categories/${elem.title}`} key={elem._id}>
                <Badge variant="outline" className="hover:bg-teal-500 m-2">
                  {elem.title}
                </Badge>
              </Link>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
