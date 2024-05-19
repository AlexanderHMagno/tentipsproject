import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Writters from "@/models/Writters";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    let user = await Writters.findById(params.id);

    if (!user) {
      //Default owner
      user = await Writters.findById("64dc060418039d6d54c2a236");
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};

export const POST = async (request: Request) => {};
