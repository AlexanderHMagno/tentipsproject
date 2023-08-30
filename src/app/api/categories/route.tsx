import { connect } from "@/lib/utils/db";
import Categories from "@/models/Categories";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const connection = await connect();
    const skipPost = 1;
    const limit = request.nextUrl.searchParams.get("limit") || 0;

    let categories;
    if (limit) {
      categories = await Categories.find().limit(+limit);
    } else {
      categories = await Categories.find().sort("title");
    }

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
