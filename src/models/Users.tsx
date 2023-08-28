import mongoose from "mongoose";
const { Schema, models, Types } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  interest: [
    {
      type: String,
    },
  ],
  likes: [
    {
      type: Types.ObjectId,
    },
  ],
  likesComments: [
    {
      type: Types.ObjectId,
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

export default models.Users || mongoose.model("Users", UserSchema);
