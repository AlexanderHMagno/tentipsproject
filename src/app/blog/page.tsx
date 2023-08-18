import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { capitalize } from "@/lib/functions";
import EntryCard from "@/components/EntryCard";

const getData = async () => {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/entries`, {
    cache: "no-store",
  });
  return data.json();
};

const Blog = async () => {
  const data = await getData();

  return (
    <>
      <div className="container  mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Trending Now:
          </h2>

          <div className="grid gap-x-6 lg:grid-cols-3">
            {data.map((elem: any) => (
              <span key={elem._id}>
                <EntryCard elem={elem} />
              </span>
            ))}
          </div>
        </section>
      </div>
    </>

    // <div>
    //   {data.map((x:any) => <CardBase key={x._id} {...x}/>)}
    // </div>
  );
};

export default Blog;
