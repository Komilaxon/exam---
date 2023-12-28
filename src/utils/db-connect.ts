import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/exam");
    console.log("db connected successfully...");
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
