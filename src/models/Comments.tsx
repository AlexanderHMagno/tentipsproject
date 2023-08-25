import mongoose from "mongoose";
const { Schema, models, Types } = mongoose;

export const CommentsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },

    id_commenter: {
      type: Types.ObjectId,
    },

    parent: {
      typer: Types.ObjectId,
    },
    likes: {
      type: Number,
    },
  },
  { timestamps: true }
);

export type CommentsType = {
  title: String;
};

const mod = models.Comments || mongoose.model("Comments", CommentsSchema);

export default mod;
