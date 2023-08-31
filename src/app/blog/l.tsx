import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Blog() {
  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <div className="mb-12">
            <Skeleton className="bg-gray-200  m-auto h-10 w-[200px]"></Skeleton>
          </div>
          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((elem: number, idx: number) => (
              <span key={elem}>
                <Card />
              </span>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}

function Card() {
  return (
    <div className="flex align-baseline md:block  pb-2 lg:mb-10 border-b-slate-50 dark:border-gray-900 border-b-2 sm:border-b-0">
      <div
        className="min-w-[100px]  mx-auto relative overflow-hidden rounded-lg bg-cover bg-no-repeat  dark:shadow-black/20 bg-[50%]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <AspectRatio ratio={16 / 10} className="h-full">
          <Skeleton className="bg-gray-200 h-[75px] md:h-[150px] w-full "></Skeleton>
        </AspectRatio>
      </div>

      <div className="ml-5 md:ml-0  md:w-full text-left flex-grow">
        <Skeleton className="bg-gray-200 mb-4 text-base/7 h-[100px] w-[90%] md:w-full"></Skeleton>
      </div>
    </div>
  );
}
