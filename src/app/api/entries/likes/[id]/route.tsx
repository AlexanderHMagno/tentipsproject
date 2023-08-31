import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Entries from "@/models/Entries";
import Users from "@/models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: true, message: "Not authorized" }),
        { status: 403 }
      );
    }

    const data = await request.json();
    const { id, upvote } = data || {};
    const { user } = session;

    const userLiked = await Users.find({ email: user?.email, likes: id });

    let updater: any = { $push: { likes: id } };
    if (userLiked.length) updater = { $pull: { likes: id } };

    await Users.findOneAndUpdate({ email: user?.email }, updater);

    const doc = await Entries.findByIdAndUpdate(id, {
      $inc: { likes: userLiked.length ? -1 : 1 },
    });

    const post = await Entries.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};
