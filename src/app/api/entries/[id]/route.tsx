import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Entries from "@/models/Entries";
import { generateIMAGE } from "@/app/api/apiFunctions";
import slugify from "slugify";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connect();
    const posts = await Entries.findOne({ slug: params.id });
    if (!posts) throw new Error("Not Found");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  try {
    await connect();

    const data = await request.json();
    const { requestImage, _id } = data || {};

    if (requestImage) updateImage(_id);
    const post = updateContent(data);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify("Not working"), { status: 400 });
  }
};

const updateContent = async (data: any) => {
  const { _id, title, content, category, slug } = data || {};

  return await Entries.findByIdAndUpdate(_id, {
    title,
    content,
    category,
    slug: slugify(title, "-"),
  });
};

const updateImage = async (_id: Number) => {
  const entri = await Entries.findById(_id, "tags");

  const { imageUrl, imageUser } = await generateIMAGE(entri.tags);
  return await Entries.findByIdAndUpdate(_id, {
    img: imageUrl,
    imageUser,
  });
};
