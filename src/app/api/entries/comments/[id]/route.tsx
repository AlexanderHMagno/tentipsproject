import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Comments from "@/models/Comments";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const comments = await Comments.find({ entry: params.id }).sort(
      "-createdAt"
    );
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const POST = async (request: Request, { params }: any) => {
  try {
    await connect();

    const data = await request.json();

    console.log(data);

    const { comment } = data || {};

    const config = {
      content: comment,
      entry: params.id,
      name: "Alexander",
      //   id_commenter: "233",
    };

    const newComment = await Comments.create(config);

    return new NextResponse(JSON.stringify(newComment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
