import React from 'react'
import Image from 'next/image'
import { PeopleCard } from '@/components/PeopleCard'
import { notFound } from 'next/navigation'
import styles from "./page.module.css";
import { Badge } from '@/components/ui/badge';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';






type props = {
  title: string,
  image: string,
  owner: string, //should be type author
  time: string,
  content: string,
  params: {
     id :string
  }

}



const getData = async (entry : string) => {
  
  const data = await fetch(`http://localhost:3000/api/entries/${entry}`, {cache: "no-store"});

  if(!data.ok) return notFound();
  const entries = data.json();

  return entries;
}



const Blog = async ({params} : props) => {  
  
  const data = await getData(params.id );

  const {_id, title, img, imageUser, desc, content, tags, createdAt} = data;

  
  const date = parseISO(createdAt);

  

  return (
    <article className='mb-32 max-w-4xl m-auto'>
    <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left '>
      {title}
    </h1>

    <div className="flex align-middle mb-4 ">
      <PeopleCard name={"Alexander Hortua"}/>

      <span className='mt-2'>
      <time dateTime={createdAt}>{format(date, 'LLLL d, yyyy')}</time>
      </span>

      <Link href={`./${_id}/edit`}>
          <button className='ml-5 py-2 px-5 text-1xl rounded-full bg-green-500'>Edit</button>
      </Link>
      
    </div>
 
    <div className={`mb-10 sm:mx-0  ${styles.picture}`}>
      <div className="sm:mx-0">
        <Image src={`${process.env.AWS_S3_BLOG_IMAGES_URL}${img}`}  loading="lazy" width={1300} height={630} decoding='async' className='shadow-sm w-full h-auto max-w-full z-0' alt={"Display Image"}/>
      </div>  
    </div>

    {imageUser && (
        <small className='-mt-16 mb-20 block ml-5 bg-black text-white'>{`by ${imageUser} via Pixabay`}</small>
      )}

    <div className="max-w-2xl mx-auto mb-10">
      <div className='mb-6 text-lg '>
        {tags.map((tag :string) => <Badge className="bg-green-400 hover:bg-blue-400 mr-5" key={tag}>{tag}</Badge>)}
      </div>
    </div>
    <div className="max-w-2xl mx-auto">
      <div className={`font-sans text-lg formatted-page ${styles["formatted-page"]}`}>
      <div  dangerouslySetInnerHTML={{__html: content}} >
        
      </div>
 

      </div>
    </div>

  </article>
  )
}


export default Blog;
