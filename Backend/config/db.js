import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database is Connected");
    });
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
