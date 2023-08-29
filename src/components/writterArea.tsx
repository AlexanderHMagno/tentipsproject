import Image from "next/image";
import { parseISO, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WritterPortofolio } from "./writterPortfolio";

type props = {
  id: string;
};

const getData = async (entry: string) => {
  const data = await fetch(`${process.env.PROJECT_URL}/api/user/${entry}`);
  return data.json();
};

export async function WritterArea({ id }: props) {
  const data = await getData(id);
  const { _id, image, name, last, bio, start } = data;
  const date = parseISO(start);
  return (
    <Card className="mt-10 dark:bg-black  border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-center">
        <Image
          src={`/images/profile/${image}`}
          width={50}
          height={200}
          className="w-20 h-20 rounded-full mr-4 "
          alt={"Display Image"}
        />
        <CardDescription>
          <span className="text-lg font-bold">
            {" "}
            Written By {name} {last}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <small>{bio}</small>
      </CardContent>
      <hr className="border-4 border-gray-100 dark:border-gray-950" />
      <CardFooter className="flex-col items-start px-0">
        <h6 className="text-lg border-l mt-10 mb-10 font-bold">
          More From {name} {last}
        </h6>
        <div>
          <WritterPortofolio id={_id} />
        </div>
      </CardFooter>
    </Card>
  );
}
