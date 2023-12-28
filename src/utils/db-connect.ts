import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.ONLINE_MONGO as string);
    console.log("db connected successfully...");
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
