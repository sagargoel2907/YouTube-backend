import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstace = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log("MongoDB connection successful");
    console.log("DB host:", connectionInstace.connection.host);
    // console.log(connectionInstace);
  } catch (error) {
    console.error("MongoDB connection Failed \n\n", error);
  }
};

export default connectDB;
