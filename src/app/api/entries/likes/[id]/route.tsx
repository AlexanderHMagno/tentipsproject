import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Entries from "@/models/Entries";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const post = await Entries.findById(params.id).select("likes");

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  try {
    await connect();

    const data = await request.json();
    const { id, upvote } = data || {};

    const post = await Entries.findByIdAndUpdate(id, { $inc: { likes: 1 } });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
