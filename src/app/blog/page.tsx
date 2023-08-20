import EntryCard from "@/components/EntryCard";
import Script from "next/script";

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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7470419655173226"
        crossOrigin="anonymous"
      ></Script>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Trending Now:
          </h2>

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
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
