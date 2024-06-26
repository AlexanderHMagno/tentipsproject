"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import styles from "@/app/blog/[id]/page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home({ params }: any) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries/${params.id}`,
    fetcher
  );

  const {
    data: dataCat,
    error: errorCat,
    isLoading: isLoadingCat,
  } = useSWR(`${process.env.NEXT_PUBLIC_PROJECT_URL}/api/categories`, fetcher);

  const { title, _id, img, imageUser, content, tags, category, slug } =
    data || {};
  const [titleHolder, setTitleHolder] = useState(title);
  const [contentHolder, setContentHolder] = useState(content);
  const [categoriesHolder, setCategoriesHolder] = useState(category);
  const [imageHolder, setimageHolder] = useState(false);
  const router = useRouter();

  if (error || errorCat) return <div>failed to load</div>;
  if (isLoading || isLoadingCat) return <div>loading...</div>;

  if (!titleHolder) setTitleHolder(data.title);
  if (!contentHolder) setContentHolder(data.content);
  if (!categoriesHolder) setCategoriesHolder(data.category);

  const addCategory = (elem: any) => {
    setCategoriesHolder([...categoriesHolder, elem.target.value]);
  };

  const removeCategory = (elem: string) => {
    setCategoriesHolder(
      [...categoriesHolder].filter((cat: string) => cat != elem)
    );
  };

  async function onSubmit() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/entries/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            title: titleHolder,
            content: contentHolder,
            category: categoriesHolder,
            requestImage: imageHolder,
          }),
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      router.push("./");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      //   alert(error.message);
    }
  }

  return (
    <article className="mb-32 w-full max-w-4xl m-auto p-5">
      <Link href={`../${slug}`}>
        <button className="float-right ml-5 mb-10 py-2 px-5 text-1xl rounded-full bg-orange-500">
          Back
        </button>
      </Link>
      <h1 className=" text-5xl lg:text-7xl font-bold tracking-tighter leading-none  text-left ">
        <textarea
          className="w-full"
          value={titleHolder}
          onChange={(e) => setTitleHolder(e.target.value)}
        />
      </h1>

      <div className="flex align-middle mb-4 "></div>

      <div className={`mb-10 sm:mx-0  ${styles.picture}`}>
        <button
          className={` mb-5 float-right ml-5 py-2 px-5 text-1xl rounded-full text-black  ${
            imageHolder ? "bg-orange-500 " : "bg-gray-200 "
          }`}
          onClick={() => setimageHolder(!imageHolder)}
        >
          Regenerate a new Image
        </button>
        <div className="sm:mx-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BLOG_IMAGES_URL}${img}`}
            priority
            width={1300}
            height={630}
            decoding="async"
            className="shadow-sm w-full h-auto max-w-full z-0"
            alt={"Display Image"}
          />
        </div>
      </div>

      {imageUser && (
        <small className="-mt-16 mb-20 block ml-5 bg-black text-white">{`by ${imageUser} via Pixabay`}</small>
      )}

      <div className="max-w-2xl mx-auto mb-10">
        <div className="mb-6 text-lg ">
          {categoriesHolder &&
            categoriesHolder.map((tag: string) => (
              <Badge
                className="bg-green-400 hover:bg-blue-400 mr-5"
                key={tag}
                onClick={(e) => removeCategory(tag)}
              >
                {tag}
              </Badge>
            ))}
        </div>

        <div>
          <Label className="mr-5">Add a Category: </Label>
          <select placeholder="Category" onChange={(e: any) => addCategory(e)}>
            {dataCat.map((option: any) => (
              <option key={option._id} value={option.title}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div
          className={`font-sans text-lg formatted-page ${styles["formatted-page"]}`}
        >
          <div>
            <ReactQuill
              modules={modules}
              value={contentHolder}
              formats={formats}
              theme="snow"
              onChange={setContentHolder}
            />
          </div>
        </div>
        <button
          className="py-2 px-5 text-2xl w-full bottom-0 bg-blue-500 sticky text-white"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </article>
  );
}
