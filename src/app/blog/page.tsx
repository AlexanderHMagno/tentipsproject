import CardBase from "@/components/CardBase";





const getData = async () => {

  const data = await fetch("http://localhost:3000/api/posts");
  const posts = data.json();
  return posts;
}


const Blog = async () => {  
  const data = await getData();
  
  return (
    <div>
      {data.map((x:any) => <CardBase key={x._id} {...x}/>)}
    </div>
  )
}

export default Blog



