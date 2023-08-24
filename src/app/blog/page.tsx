import EntryCard from "@/components/EntryCard";
import BlogLoader from "@/components/blogLoader";
import { configCache } from "@/lib/api/helpers/connections";

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
          <h2 className="mb-12 text-center text-3xl font-bold">
            Trending Now:
          </h2>

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3 h-auto">
            {data.map((elem: any, idx: number) => (
              <span key={elem._id}>
                <EntryCard elem={elem} lazy={idx > 10} />
              </span>
            ))}

            <BlogLoader />
          </div>
        </section>
      </div>
    </>
  );
}
