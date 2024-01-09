import express from "express";
import connectDB from "./db/conn.js";
import { app } from "./app.js";
import "dotenv/config";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App running on port :${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.error("Error:", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("Error while starting the app :", error);
  });

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.error("Error:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App running on port :${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
*/
// let env = {
//   "ACCESS_TOKEN_EXPIRY": "1d",
//   "ACCESS_TOKEN_sECRET": "E1U77mbOjosgy3YYWspjDkZw6DOhCgPZ",
//   "CLOUDINARY_API_KEY": "548481377137129",
//   "CLOUDINARY_API_SECRET": "zkfPjzwaYggFKPWn6-RS8DRhOxs",
//   "CLOUDINARY_CLOUD_NAME": "dftnclziz",
//   "MONGODB_URI": "mongodb+srv://sagar:sagar2907@cluster0.cksemwu.mongodb.net",
//   "PORT": "8000",
//   "REFRESH_TOKEN_EXPIRY": "10d",
//   "REFRESH_TOKEN_sECRET": "X2wStjP9M4Z5gaVOD5hq14MaOeMyyS2T",
//   "CORS_ORIGIN": "*",
// };
