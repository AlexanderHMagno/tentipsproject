import mongoose from "mongoose";
const { Schema, models } = mongoose;

export const CategoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    group: [
      {
        type: String,
      },
    ],
    writters: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export type CategoriesType = {
  title: String;
};

const mod = models.Categories || mongoose.model("Categories", CategoriesSchema);

export default mod;
