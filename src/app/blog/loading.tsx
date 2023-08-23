import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  return (
    <>
      <div className="container px-1 mx-auto md:px-6">
        <section className=" text-center lg:text-left">
          <h2 className="mb-12 text-center text-3xl font-bold">
            <Skeleton className="bg-gray-200 h-[250px] w-[250px]"></Skeleton>
          </h2>

          <div className="md:grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((elem: number, idx: number) => (
              <span key={elem}>
                <Skeleton className="bg-gray-200 h-[150px] w-[150px]"></Skeleton>
              </span>
            ))}
            <span></span>
          </div>
        </section>
      </div>
    </>
  );
}
