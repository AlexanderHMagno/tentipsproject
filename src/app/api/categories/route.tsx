import { connect } from "@/lib/utils/db";
import Categories from "@/models/Categories";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const connection = await connect();
    const skipPost = 1;
    const posts = await Categories.find().sort("title");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
