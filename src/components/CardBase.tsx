import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import Image from 'next/image';
import { Button } from "./ui/button";
import Link from "next/link";
  

  type props = {
    _id: string,
    title: string,
    desc: string,
    img: string,
    content: string,
    userName: string,
    timestamp: string
  }

  const CardBase = ({title,img,content,userName,_id} : props) => {
    
    return (
        <Card>
            <CardHeader>
                <Image src={img} width={200} height={200} alt={"Display Image"}/>
                <CardDescription>{title}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <p>{userName}</p>
            </CardFooter>
            <Link
                href={"/blog/1"}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 rounded hover:square bg-orange-600 hover:bg-orange-300 text-white w-96">
                View
            </Link>
        </Card>

    )
  }


  export default CardBase;