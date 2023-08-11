import { generateEntryFromInput, sleep } from "@/app/api/entries/route";

const data_to_create = [
  "Beginner's Guide to Yoga and Its Benefits",
  "Travel Destinations for Adventure Enthusiasts",
  "Mastering the Art of Public Speaking",
  "Sustainable Living: Tips for Eco-Friendly Choices",
  "Introduction to Coding and Programming Languages",
  "Unveiling the Wonders of Space and Astronomy",
  "The Power of Positive Thinking in Daily Life",
  "Unlocking Creativity: Tips for Overcoming Creative Blocks",
  "Basics of Personal Finance and Money Management",
  "Understanding Mental Health and Self-Care Practices",
  "The World's Most Fascinating Historical Mysteries",
  "Photography Techniques for Capturing Stunning Moments",
  "DIY Home Improvement Projects for Beginners",
  "Exploring Different Types of Music and Their Influence",
  "Building Strong and Lasting Relationships",
];

export const superGenerator = async () => {
  for (let index = 0; index < data_to_create.length; index++) {
    await generateEntryFromInput(data_to_create[index]);
  }

  return await sleep(1);
};
