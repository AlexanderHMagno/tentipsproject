import connect from "@/lib/utils/db";
import {NextResponse} from "next/server";
import Users from "@/models/User";

export const GET  = async (request:Request) => {
    try {

        await connect();
        const posts = await Users.find();
        return new NextResponse(JSON.stringify(posts), {status:200});
    } catch (error) {
        return new NextResponse("Not working", {status:400});
    }
}


export const POST  = async (request:Request) => {
    try {
            
        await connect();

        // const posts = await Users.find();
        const users = ["age"];
        return new NextResponse(JSON.stringify(users), {status:200});
    } catch (error) {
        
        return new NextResponse("Not working", {status:400});
    }
}



