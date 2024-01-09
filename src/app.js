import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers import
import userRouter from "./routes/user.routes.js";
import asyncHandler from "./utils/asyncHandler.js";

// routes declaration
app.use("/api/v1/user", userRouter);

app.route("/api/v1/file/:fileName").get(
  asyncHandler((req, res) => {
    const fileName = req.params.fileName;
    // console.log("file request received", fileName);
    const fileExists = fs.existsSync(`./public/temp/${fileName}`);
    if (!fileExists) {
      throw new ApiError(404, "File does not exists");
    }
    return res.sendFile(path.join(process.cwd(), "public", "temp", fileName));
  })
);

export { app };
