import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import { generateEntryFromInput } from "@/app/api/entries/route";

import Queue from "@/models/Queue";

export const GET = async (request: Request) => {
  try {
    await connect();
    const posts = await Queue.find({ created: false });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

//TODO: MAKE sure you have a type of middleware to evaluate this, also make sure the token or bearer is set in your env
export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { token } = data;

    if (token != "746jdhd") throw new Error("Get Out");
  } catch (e: any) {
    return new NextResponse("Not allowed", {
      status: 403,
    });
  }

  await connect();

  const queueData = await Queue.findOneAndUpdate(
    { created: false },
    { created: true }
  ).sort({ title: "asc" });

  try {
    const content = await generateEntryFromInput(
      queueData.title,
      queueData.category,
      queueData.author
    );

    return new NextResponse(JSON.stringify(queueData), {
      status: 200,
    });
  } catch (e: any) {
    await Queue.findByIdAndUpdate(queueData._id, { created: false });

    return new NextResponse("We could not create an entry", {
      status: 400,
    });
  }
};
