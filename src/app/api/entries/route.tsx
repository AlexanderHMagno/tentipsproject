import { generateEntryFromInput } from "../apiFunctions";
import { connect } from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Entries from "@/models/Entries";

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const position = request.nextUrl.searchParams.get("pos");
    const skipPost: number = position ? +position : 0;
    const elements = 40;

    const posts = await Entries.find()
      .select("-content")
      .sort("-createdAt")
      .limit(elements)
      .skip(elements * skipPost);

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();

    const data = await request.json();

    const {
      solicitude,
      category,
      author,
    }: { solicitude: string; category: string; author: string } = data;

    if (solicitude.trim().length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Please enter a valid topic" }),
        { status: 400 }
      );
    }

    const result = await generateEntryFromInput(solicitude, category, author);

    return new NextResponse(JSON.stringify({ result }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error.response?.data), {
      status: error.response?.status,
    });
  }
};
