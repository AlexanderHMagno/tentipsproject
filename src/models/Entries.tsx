import mongoose from "mongoose";
const { Schema, models } = mongoose;

const EntriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    imageUser: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array<string>,
      required: false,
    },
    category: {
      type: Array<string>,
      required: false,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    author: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const mod = models.Entries || mongoose.model("Entries", EntriesSchema);
export default mod;
