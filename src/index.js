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
