import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import Image from 'next/image';
  

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
        </Card>

    )
  }


  export default CardBase;