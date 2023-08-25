import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import { generateNewEntryToQueue } from "@/app/api/apiFunctions";

import Queue from "@/models/Queue";

export const GET = async (request: Request) => {
  const posts = "Hello World";
  return new NextResponse(JSON.stringify(posts), { status: 200 });
};

//Create a new entry for the Queue system
export const POST = async (request: Request) => {
  try {
    await connect();

    const data = await request.json();
    const result = await generateNewEntryToQueue(data);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e: any) {
    return new NextResponse("Not allowed", {
      status: 403,
    });
  }
};
