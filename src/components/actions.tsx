import Comments from "./comments";
import ShowLove from "./loves";
import { Types } from "mongoose";

export default function ActionsComponent({ id }: { id: string }) {
  return (
    <>
      <Comments id={new Types.ObjectId(id)} />
      <ShowLove id={id} />
    </>
  );
}
