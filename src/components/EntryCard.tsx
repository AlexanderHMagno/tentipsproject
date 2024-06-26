import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/lib/functions";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import STR from "@supercharge/strings";

export default function EntryCard({
  elem,
  lazy,
}: {
  elem: any;
  lazy: boolean;
}) {
  return (
    <div
      key={elem._id}
      className="flex align-baseline md:block mb-5 pb-2 lg:mb-10 border-b-slate-50 dark:border-gray-900 border-b-2 sm:border-b-0"
    >
      <div
        className="min-w-[100px] mb-5 mx-auto relative overflow-hidden rounded-lg bg-cover bg-no-repeat  dark:shadow-black/20 bg-[50%]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <AspectRatio ratio={16 / 10} className="h-full">
          <Image
            alt={`Image of ${elem.title}`}
            fill
            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            src={`${process.env.NEXT_PUBLIC_AWS_S3_BLOG_IMAGES_URL}${elem.img}`}
            className="rounded-md object-cover align-baseline"
            loading={lazy ? "lazy" : undefined}
            priority={!lazy}
            placeholder="blur"
            blurDataURL="/images/blur.png"
          />
        </AspectRatio>
        <Link href={`/blog/${elem.slug}`}>
          <div className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,0.2)]"></div>
        </Link>
      </div>

      <div className="ml-5 md:ml-0  md:w-full text-left flex-grow">
        <Link href={`/blog/${elem.slug}`}>
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
