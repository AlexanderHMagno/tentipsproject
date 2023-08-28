import { connect } from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Comments from "@/models/Comments";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Users from "@/models/Users";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();

    const comments = await Comments.find({ parent: params.id }).sort(
      "-createdAt"
    );
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const POST = async (request: Request, { params }: any) => {
  try {
    await connect();

    const data = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ is_failed: true, message: "Not Authorized" }),
        {
          status: 403,
        }
      );
    }

    const { user } = session;
    const { comment, action } = data || {};

    if (action == "like") {
      return actionLike(params.id, user?.email || "");
    } else {
      const config = {
        content: comment,
        parent: params.id,
        name: session?.user?.name,
        //   id_commenter: "233",
      };

      const newComment = await Comments.create(config);

      return new NextResponse(JSON.stringify(newComment), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

//Implementing the action form
async function actionLike(id: string, email: string) {
  try {
    const userLiked = await Users.find({ email, likesComments: id });

    let updater: any = { $push: { likesComments: id } };
    if (userLiked.length) updater = { $pull: { likesComments: id } };

    await Users.findOneAndUpdate({ email }, updater);

    const doc = await Comments.findByIdAndUpdate(id, {
      $inc: { likes: userLiked.length ? -1 : 1 },
    });

    const comment = await Comments.findById(id);
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
}
