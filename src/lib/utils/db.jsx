import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export const close = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};
