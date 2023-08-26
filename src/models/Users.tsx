import mongoose from "mongoose";
const { Schema, models, Types } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
  },
});

export default models.Users || mongoose.model("Users", UserSchema);
