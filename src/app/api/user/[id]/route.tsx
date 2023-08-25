import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Writters from "@/models/Writters";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const user = await Writters.findById(params.id);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};

export const POST = async (request: Request) => {};
