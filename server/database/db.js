import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        dbName: "LEARNING",
      },
      console.log("DATA BASE CONNECT SUCCESSFULLY")
    );
  } catch (error) {
    console.log("DATA BASE CONNECTION FAILED", error);
  }
};
