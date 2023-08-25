import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const WritterSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userCreators = [
  "64dc060418039d6d54c2a236",
  "64dc0694aaa943276b07f186",
  "64dc074caaa943276b07f187",
  "64dc077daaa943276b07f188",
  "64dc0f8eed09c5eb7c8decda",
  "64dc0f5ded09c5eb7c8dcbc2",
  "64dc0f45ed09c5eb7c8dbba4",
  "64dc0f16ed09c5eb7c8d9be6",
];

export default models.Writters || model("Writters", WritterSchema);
