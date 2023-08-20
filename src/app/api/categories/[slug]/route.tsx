import connect from "@/lib/utils/db";
import Categories from "@/models/Categories";
import Entries from "@/models/Entries";
import { NextResponse } from "next/server";

import { categories } from "@/lib/data/categories";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const skipPost = 1;
    const posts = await Entries.find({ category: [params.slug] }).sort("title");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
