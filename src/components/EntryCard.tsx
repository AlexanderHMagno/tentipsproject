import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/lib/functions";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import STR from "@supercharge/strings";

export default function EntryCard({ elem }: { elem: any }) {
  return (
    <div
      key={elem._id}
      className="flex  align-baseline md:block mb-12 lg:mb-10"
    >
      <div
        className="min-w-[150px] mb-5 mx-auto relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <AspectRatio ratio={16 / 10} className="h-full">
          <Image
            alt={`Image of ${elem.title}`}
            fill
            src={`${process.env.AWS_S3_BLOG_IMAGES_URL}${elem.img}`}
            className="rounded-md object-cover align-baseline"
          />
        </AspectRatio>
        <Link href={`/blog/${elem._id}`}>
          <div className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,0.2)]"></div>
        </Link>
      </div>

      <div className="ml-5 md:ml-0 w-72 md:w-full text-left flex-grow">
        <Link href={`/blog/${elem._id}`}>
          <h5 className="mb-4 text-base/7 font-bold leading-5">{elem.title}</h5>
        </Link>
        <div className="hidden sm:flex mb-4  text-xs  dark:text-danger-500 lg:justify-start">
          {elem.tags.map((x: string) => capitalize(x)).join(", ")}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">
          {STR(elem.desc).limit(100, "...").get()}
        </p>
      </div>
    </div>
  );
}
