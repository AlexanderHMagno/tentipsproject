import fetch from "node-fetch";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Categories, { CategoriesSchema } from "@/models/Categories";
import Queue from "@/models/Queue";
import { getRandomInt, removeNumbers } from "@/lib/functions";
import OPENAI from "@/lib/api/openAi";
import User, { userCreators } from "@/models/User";
import { Configuration, OpenAIApi } from "openai";
import { NextRequest, NextResponse } from "next/server";
import Entries from "@/models/Entries";

/**
 * Request an Image to Pixabay and register this value into s3 bucket
 * @param topic
 * @returns
 */
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
      const buffer = await imageData.arrayBuffer();

      const uploadedImage = await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME_IMAGES || "",
          Key: `blogs/${fileName}`,
          //@ts-ignore
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

/**
 * Generate a Prompt for Artificial Intelligence
 * @param topic Add salt to this to create a different output
 * @returns
 */
export function generateContentString({
  topic,
  category,
}: {
  topic: string;
  category: string;
}) {
  return ` generate 10 tips (without numbers in titles) for ${topic} category ${category}:
    body (at least 500 words per tip with html for react): 
    as example <div><h2>for titles</h2><p>for content</p></div>
    `;
}

/**
 * Generate the metadata for a new Post
 * @param topic that is being created, normally is the same question that will be used in generateContentString
 * @returns
 */
export function generateMetaData(topic: string) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  return ` generate a json with this topic${capitalizedTopic} :
      with the following JSON output
      '{"title":"generate a catchy title for the topic", "tags":"array of tags for this topic,
      "short" : "short description for topic"}'
      `;
}

/**
 * This is the most important function because is the one in charge of creating a new entry
 * @param solicitude The title used to create a new entry
 * @param category What category is going to be created
 * @param author a mongo UID representing the writter.
 * @returns
 */
export async function generateEntryFromInput(
  solicitude: string,
  category: string = "",
  author: string = ""
) {
  try {
    const openai = new OPENAI();

    //Generate MetaData
    const metaData = await openai.generateRequest(
      generateMetaData(solicitude),
      0.6,
      1500
    );
    const answer = JSON.parse(metaData.data.choices[0].text || "");

    const {
      title,
      tags,
      short,
    }: { title: string; tags: string[]; short: string } = answer;

    //Generate Images
    const { imageUrl, imageUser } = await generateIMAGE(tags);

    //Generate Content
    const completion = await openai.generateRequest(
      generateContentString({ topic: solicitude, category }),
      0.6,
      2500
    );

    const content = completion.data.choices[0].text?.trim();
    const lowerTags = tags.map((elem: string) => elem.toLowerCase());

    //Add entry to the database
    await Entries.create({
      title,
      desc: short,
      img: imageUrl,
      imageUser,
      content: removeNumbers(content + ""),
      category: [category],
      author,
      tags: lowerTags,
      likes: getRandomInt(200, 50),
    });

    //Add sub categories to the Category
    const cat = await Categories.findOne({ title: category });
    const merge = !cat.group ? [] : cat.group;
    const merger = Array.from(new Set(merge.concat(lowerTags)));
    await Categories.findOneAndUpdate({ title: category }, { group: merger });

    //return this content
    return content;
  } catch (e) {
    //If anything fails we are going to see this in the vercel logs area
    console.log(e);
    return e;
  }
}

/**
 * Generate a new entry for Queue... this should be in the Queue Api
 * @param data
 * @returns
 */
export async function generateNewEntryToQueue(data: any): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const OpenAI = new OPENAI();

      let request = data.allCategories
        ? (await Categories.find().select("title")).map(
            (x: { title: string }) => x.title
          )
        : [data.category];

      request.forEach(async (category) => {
        const completion = await OpenAI.generateRequest(
          `Generate a list of ${data.number}  "how to" questions about the topic ${category} ${data.solicitude}`,
          0.6,
          1000
        );

        const content = completion.data.choices[0].text?.trim();
        const inputs = removeNumbers(content + "").split("\n");
        const cat: any = await Categories.findOne({ title: category });

        inputs?.map(async (topic: string) => {
          let author = userCreators[getRandomInt(userCreators.length)];
          if (cat.writters) {
            author = cat.writters[getRandomInt(cat.writters.length)];
          }
          const createQueue = await Queue.create({
            title: topic,
            category: category,
            created: false,
            author,
          });
        });
      });

      return resolve("Created");
    } catch (error) {
      return reject("Not Created");
    }
  });
}
