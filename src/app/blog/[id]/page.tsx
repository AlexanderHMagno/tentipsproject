import React from "react";
import Image from "next/image";
import { PeopleCard } from "@/components/PeopleCard";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { Badge } from "@/components/ui/badge";
import { parseISO, format } from "date-fns";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { WritterArea } from "@/components/writterArea";
import EditEntry from "@/components/auth/editEntry";
import Actions from "@/components/actions";
import { configCache } from "@/lib/api/helpers/connections";
import slugify from "slugify";

interface props {
  title: string;
  desc: string;
  image: string;
  owner: string;
  tags: [];
  time: string;
  content: string;
  params: {
    id: string;
  };
}

const getData = async (entry: string) => {
  const url = `${process.env.PROJECT_URL}/api/entries/${entry}`;
  const data = await fetch(url, configCache(360000));

  if (!data.ok) return notFound();
  const entries = data.json();

  return entries;
};

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const data: props = await getData(id);

  console.log("slugify", slugify(data.title, "-"));

  return {
    title: data.title,
    category: data.tags.join(","),
    description: `${data.tags.join(",")} - ${data.desc}`,
    authors: [{ name: "Alexander Hortua" }],
    icons: { icon: "/images/logo-solo.png" },
    keywords: data.tags,
  };
}

const Blog = async ({ params }: any) => {
  const data = await getData(params.id);

  if (!data) return <h1>Not found</h1>;

  const {
    _id,
    title,
    img,
    imageUser,
    category,
    content,
    tags,
    createdAt,
    author = "64dc060418039d6d54c2a236",
    slug,
  } = data;

  const date = parseISO(createdAt);

  return (
    <>
      <article className="p-5 mb-32 w-full lg:max-w-4xl m-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left ">
          {title}
        </h1>

        <div className="flex items-center mb-4 ">
          <PeopleCard id={author} />

          <span className="text-xs lg:text-sm">
            <time dateTime={createdAt}>{format(date, "LLLL d, yyyy")}</time>
          </span>

          <EditEntry id={slug} />
        </div>

        <div className="border-y-2 border-gray-50 dark:border-gray-900 py-2 w-full my-2 flex justify-center h-10">
          <Actions id={_id} />
        </div>
        <div className={`mb-10 sm:mx-0  ${styles.picture}`}>
          <div className="sm:mx-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BLOG_IMAGES_URL}${img}`}
              width={1300}
              height={630}
              priority
              className={`shadow-sm w-full max-w-full z-0 ${styles.picturepost}`}
              alt={`image of ${tags.join(", ")} `}
              placeholder="blur"
              blurDataURL="/images/blur.png"
            />
          </div>
        </div>

        {imageUser && (
          <small className="-mt-16 mb-5 block ml-5 bg-black text-white">
            by{" "}
            <Link
              aria-label={`image Author ${imageUser}`}
              target="_blank"
              href={`https://pixabay.com/users/${imageUser}`}
            >
              {imageUser}
            </Link>{" "}
            via{" "}
            <Link target="_blank" href={"https://pixabay.com"}>
              Pixabay
            </Link>
          </small>
        )}

        <div className="max-w-2xl mx-auto mb-10">
          <div className="mb-6 text-lg text-white">
            {category &&
              category.map((tag: string) => (
                <Link key={tag} href={`/categories/${tag}`}>
                  <Badge className="bg-brand2 hover:bg-brand mr-5">{tag}</Badge>
                </Link>
              ))}
            {tags.map((tag: string) => (
              <Link key={tag} href={`/categories/${tag}`}>
                <Badge className="bg-brand3 hover:bg-brand mr-5">{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div
            className={`font-sans text-lg formatted-page ${styles["formatted-page"]}`}
          >
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>

        <WritterArea id={author} />
      </article>
    </>
  );
};

export default Blog;
