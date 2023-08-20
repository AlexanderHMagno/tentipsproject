import mongoose from "mongoose";
const { Schema, models } = mongoose;

export const CategoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    group: {
      type: String,
    },
  },
  { timestamps: true }
);

export type CategoriesType = {
  title: String;
  category: String;
  author: Number;
  created: Boolean;
};

const mod = models.Categories || mongoose.model("Categories", CategoriesSchema);

export default mod;
