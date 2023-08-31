import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Writters from "@/models/Writters";

export const GET = async (request: Request) => {
  try {
    await connect();

    const writters = await Writters.find();

    return new NextResponse(JSON.stringify(writters), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();

    const writters = ["age"];
    return new NextResponse(JSON.stringify(writters), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};
