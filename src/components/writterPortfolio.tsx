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
import EntryCard from "./EntryCard";

type props = {
  id: string;
};

const getData = async (entry: string) => {
  const data = await fetch(
    `${process.env.PROJECT_URL}/api/entries/writter/${entry}`
  );
  return data.json();
};

export async function WritterPortofolio({ id }: props) {
  const data = await getData(id);

  return (
    <div className="grid md:gap-x-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((entry: any) => (
        <span key={entry._id}>
          <EntryCard elem={entry} />{" "}
        </span>
      ))}
    </div>
  );
}
