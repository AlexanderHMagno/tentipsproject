import { Configuration, OpenAIApi } from "openai";


import connect from "@/lib/utils/db";
import {NextResponse} from "next/server";
import Entries from "@/models/Entries";

export const GET  = async (request:Request) => {
    try {
        
        await connect();
        const posts = await Entries.find();
        return new NextResponse(JSON.stringify(posts), {status:200});
    } catch (error) {
        return new NextResponse("Not working", {status:400});
    }
}


export const POST  = async (request:Request) => {
    try {
        
        await connect();


        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        if (!configuration.apiKey) {
            const message = "OpenAI API key not configured, please follow instructions in README.md";
            return new NextResponse(JSON.stringify(message), {status:500});
        }

        const data = await request.json();
        const {solicitude} = data || "";

        if (solicitude.trim().length === 0) {

            return new NextResponse(
                JSON.stringify({message: "Please enter a valid topic"}),
                {status:400});
        }

        try {

            const metaData = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: generateMeta(solicitude),
              temperature: 0.6,
              max_tokens: 1000
            });
            
            
            const answer= JSON.parse(metaData.data.choices[0].text || "") ;
            // @ts-ignore comment
            console.log(answer);
            const {title, tags, short} = answer; 

            
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: generatePrompt(solicitude),
                temperature: 0.6,
                max_tokens: 2000
                });
            
            const content = completion.data.choices[0].text?.trim();
            
            await sleep(20000);

            const response = await openai.createImage({
                prompt: `a photo  of ${title} with ${tags} as background: important: no letters on it`,
                n: 1,
                size: "1024x1024",
              });
            const image_url = response.data.data[0].url;

            const entrie = await Entries.create(
                {
                    title,
                    desc: short,
                    img: image_url,
                    content,
                    tags: tags,
                }
            );
            return new NextResponse(JSON.stringify({
                result: content
            }), {status:200});


        } catch(error:any) {
            // Consider adjusting the error handling logic for your use case
            if (error.response) {
                console.error(error.response.status, error.response.data);
                return new NextResponse(
                    JSON.stringify(error.response?.data),
                    {status: error.response?.status}
                    );
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                return new NextResponse(JSON.stringify({
                    message: 'An error occurred during your request.',
                }), {status:500});              
            }
        }

    } catch (error) {
        return new NextResponse("Not working", {status:400});
    }
}


function sleep(ms : number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


function generatePrompt(topic : string) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  return ` generate 10 tips for ${capitalizedTopic} :
  body (at least 500 words per tip with html for react): 
  as example <div><h2>for titles</h2><p>for content</p></div>
  `;
  // with a catchy title, body (at least 500 words with html and tailwind css for react) , tags, short content`;
}


function generateMeta(topic : string) {
    const capitalizedTopic =
      topic[0].toUpperCase() + topic.slice(1).toLowerCase();
    return ` generate a json with this topic${capitalizedTopic} :
    with the following JSON output
    '{"title":"generate a catchy title for the topic", "tags":"array of tags for this topic,
    "short" : "short description for topic"}'
    `;
    // with a catchy title, body (at least 500 words with html and tailwind css for react) , tags, short content`;
  }

