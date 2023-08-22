import EntryCard from "@/components/EntryCard";
import AdsenseClient from "@/components/adSense";

const getData = async () => {
  const data = await fetch(`${process.env.PROJECT_URL}/api/entries`, {
    next: { revalidate: 3600 },
  });

  if (!data.ok) {
    return new Promise((resolve, reject) => resolve([]));
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

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((elem: any, idx: number) => (
              <span key={elem._id}>
                <EntryCard elem={elem} lazy={idx > 10} />
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
