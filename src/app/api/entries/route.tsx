import { Configuration, OpenAIApi } from "openai";
import fetch from "node-fetch";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import connect from "@/lib/utils/db";
import { NextResponse } from "next/server";
import Entries from "@/models/Entries";
import { superGenerator } from "@/app/api/entries/superCreator";

export const GET = async (request: Request) => {
  try {
    await connect();
    const posts = await Entries.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Not working", { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();

    const data = await request.json();
    const { solicitude } = data || "";

    if (solicitude.trim().length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Please enter a valid topic" }),
        { status: 400 }
      );
    }

    // OPEN AI PROCESS REQUEST METADATA

    try {
      //   await superGenerator();
      const content = await generateEntryFromInput(solicitude);
      //   const content = "Alex";

      return new NextResponse(
        JSON.stringify({
          result: content,
        }),
        { status: 200 }
      );
    } catch (error: any) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        return new NextResponse(JSON.stringify(error.response?.data), {
          status: error.response?.status,
        });
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        return new NextResponse(
          JSON.stringify({
            message: "An error occurred during your request.",
          }),
          { status: 500 }
        );
      }
    }
  } catch (e) {}
};

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const generateIMAGE = async (topic: Array<string>) => {
  try {
    for (let index = 0; index < topic.length; index++) {
      // PIXABAY PROCESS
      const params = {
        key: process.env.PIXABAY_API_KEY || "",
        q: topic[index].trim(),
        image_type: "photo",
        pretty: "true",
        order: "popular",
        per_page: "10",
      };

      const url = new URL("https://pixabay.com/api/");
      const param = new URLSearchParams(params).toString();
      const uri = `${url}?${param}`;

      // return
      const images = await fetch(uri);
      const imageJSON: any = await images.json();

      if (!imageJSON["hits"].length) continue;

      // AWS CONFIG
      //@ts-ignore
      const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        },
      });

      //@ts-ignore
      const element = imageJSON["hits"][getRandomInt(imageJSON["hits"].length)];
      // The URL of the image to download
      const imageURL = element.largeImageURL;
      // The name of the image file
      const fileName = `${element.id}.jpg`;

      // Use fetch to get the image data as a buffer

      const imageData = await fetch(imageURL);
      //@ts-ignore
      const buffer = await imageData.buffer();

      const uploadedImage = await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME_IMAGES || "",
          Key: `blogs/${fileName}`,
          Body: buffer,
        })
      );

      return {
        imageUrl: fileName,
        imageUser: element.user,
      };
    }

    throw new Error("Not image found");
  } catch (error) {
    return {
      imageUrl: "notFound.jpg",
      imageUser: "Ross Mann",
    };
  }
};

function generatePrompt(topic: string) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  return ` generate 10 tips (without numbers in titles) for ${capitalizedTopic} :
  body (at least 500 words per tip with html for react): 
  as example <div><h2>for titles</h2><p>for content</p></div>
  `;
  // with a catchy title, body (at least 500 words with html and tailwind css for react) , tags, short content`;
}

function generateMeta(topic: string) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  return ` generate a json with this topic${capitalizedTopic} :
    with the following JSON output
    '{"title":"generate a catchy title for the topic", "tags":"array of tags for this topic,
    "short" : "short description for topic"}'
    `;
  // with a catchy title, body (at least 500 words with html and tailwind css for react) , tags, short content`;
}

function getRandomInt(max: number, min: number = 0) {
  return Math.floor(Math.random() * max) + min;
}

export async function generateEntryFromInput(solicitude: string) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    if (!configuration.apiKey) {
      const message =
        "OpenAI API key not configured, please follow instructions in README.md";
      return new NextResponse(JSON.stringify(message), { status: 500 });
    }

    //REQUEST DATA
    const metaData = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateMeta(solicitude),
      temperature: 0.6,
      max_tokens: 1000,
    });
    const answer = JSON.parse(metaData.data.choices[0].text || "");
    // @ts-ignore comment
    const { title, tags, short } = answer;

    //Generate Images

    const { imageUrl, imageUser } = await generateIMAGE(tags);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(solicitude),
      temperature: 0.6,
      max_tokens: 2000,
    });

    const content = completion.data.choices[0].text?.trim();

    await Entries.create({
      title,
      desc: short,
      img: imageUrl,
      imageUser,
      content,
      tags: tags,
      likes: getRandomInt(200, 50),
    });

    return content;
  } catch (e) {
    return "Alex";
  }
}
