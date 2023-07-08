import connect from "@/lib/utils/db";
import {NextResponse} from "next/server";
import Posts from "@/models/Post";

export const GET  = async (request:Request) => {
    try {
        
        await connect();
        const posts = await Posts.find();
        return new NextResponse(JSON.stringify(posts), {status:200});
    } catch (error) {
        return new NextResponse("Not working", {status:400});
    }
}


