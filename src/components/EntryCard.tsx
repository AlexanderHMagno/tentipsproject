import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/lib/functions";
import styles from "./page.module.css";
import STR from "@supercharge/strings";

export default function EntryCard({ elem }: { elem: any }) {
  return (
    <div key={elem._id} className="mb-12 lg:mb-10">
      <div
        className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <Image
          alt="subtitle"
          width="1000"
          height="1000"
          src={`${process.env.AWS_S3_BLOG_IMAGES_URL}${elem.img}`}
          className={`w-full object-cover min-h-full ${styles.pictures}`}
        />
        <Link href={`/blog/${elem._id}`}>
          <div className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,0.2)]"></div>
        </Link>
      </div>

      <h5 className="mb-4 text-lg font-bold">{elem.title}</h5>
      <div className="mb-4 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 lg:justify-start">
        {elem.tags.map((x: string) => capitalize(x)).join(", ")}
      </div>
      <p className="text-neutral-500 dark:text-neutral-300">
        {STR(elem.desc).limit(100, "...").get()}
      </p>
    </div>
  );
}
