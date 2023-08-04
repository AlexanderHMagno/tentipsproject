import CardBase from "@/components/CardBase";
import Image from "next/image";
import Link from "next/link";





const getData = async () => {

  const data = await fetch("http://localhost:3000/api/entries",{cache: "no-store"});
  const entries = data.json();

  return entries;
}

const Blog = async () => {  
  const data = await getData();

    
  return (
  <>
  <div className="container mb-96 mx-auto md:px-6">
  
  <section className="mb-32 text-center lg:text-left">
    <h2 className="mb-12 text-center text-3xl font-bold">
      10 tips about:
    </h2>

    <div className="grid gap-x-6 lg:grid-cols-3">

      {data.map((elem: any) => {
      return (
        
        <div  key={elem._id} className="mb-12 lg:mb-10">
        
        <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 bg-[50%]" data-te-ripple-init data-te-ripple-color="light">
          <Image 
            alt="subtitle" 
            width="1000" 
            height="1000" 
            src={elem.img} 
            className="w-full object-fill min-h-full" />
          <Link href={`blog/${elem._id}`} >
            <div
              className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,0.2)]">
                
              </div>
          </Link>
        </div>
        
        <h5 className="mb-4 text-lg font-bold">{elem.title}</h5>
        <div className="mb-4 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 lg:justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          </svg>
          {elem.tags.map((x:string) => x.toUpperCase()).toString(", ")}
        </div>
        <p className="text-neutral-500 dark:text-neutral-300">
          {elem.desc}
        </p>
      </div>
      )}
      )}
  </div>
  </section>

</div>


</>

    // <div>
    //   {data.map((x:any) => <CardBase key={x._id} {...x}/>)}
    // </div>
  )
}

export default Blog



