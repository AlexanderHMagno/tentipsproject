import mongoose from "mongoose";
const { Schema, models } = mongoose;

export const QueueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    created: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type QueueType = {
  title: String;
  category: String;
  author: Number;
  created: Boolean;
};

const mod = models.Queue || mongoose.model("Queue", QueueSchema);

export default mod;
