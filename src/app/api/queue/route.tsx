import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";

import Queue from "@/models/Queue";

export const GET = async (request: Request) => {
  try {
    await connect();
    const posts = await Queue.find({ created: false });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};

export const POST = async (request: Request) => {};
