import connect from "@/lib/utils/db";
import Categories from "@/models/Categories";
import { NextResponse } from "next/server";

import { categories } from "@/lib/data/categories";

export const GET = async (request: Request) => {
  try {
    await connect();

    const skipPost = 1;
    const posts = await Categories.find().sort("title");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log("Ale4");
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
