import { Configuration, OpenAIApi } from "openai";


import connect from "@/lib/utils/db";
import {NextResponse} from "next/server";
import Entries from "@/models/Entries";

export const GET  = async (request:Request, {params} : any) => {

    
    try {
        
        await connect();
        const posts = await Entries.findById(params.id);
        return new NextResponse(JSON.stringify(posts), {status:200});
    } catch (error) {
        return new NextResponse("Not working", {status:400});
    }
}
