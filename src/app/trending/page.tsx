import Trending from "@/components/trending/Trending";
import Image from "next/image";

export default function TrendingPage() {
  return (
    <>
      <section className=" text-center">
        <h2 className=" text-3xl font-bold flex items-center justify-center mb-20 ">
          <Image
            src={"/images/logo-solo.png"}
            width={20}
            height={50}
            alt={"logo"}
            className="inline"
          />{" "}
          Trending
        </h2>
        <Trending limit={50} title={false} />
      </section>
    </>
  );
}
