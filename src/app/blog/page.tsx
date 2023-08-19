import EntryCard from "@/components/EntryCard";

const getData = async () => {
  const data = await fetch(`${process.env.PROJECT_URL}/api/entries`, {
    cache: "no-store",
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
      <div className="container  mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Trending Now:
          </h2>

          <div className="grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((elem: any) => (
              <span key={elem._id}>
                <EntryCard elem={elem} />
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
