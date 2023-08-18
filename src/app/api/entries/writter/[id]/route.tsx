import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Entries from "@/models/Entries";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();
    const posts = await Entries.find({ author: params.id });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const PATCH = async (request: Request, { params }: any) => {};
