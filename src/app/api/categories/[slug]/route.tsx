import { connect } from "@/lib/utils/db";
import Entries from "@/models/Entries";
import { NextResponse } from "next/server";
import STR from "@supercharge/strings";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const skipPost = 1;
    const posts = await Entries.find({
      $or: [{ category: params.slug }, { tags: params.slug }],
    }).sort("title");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
