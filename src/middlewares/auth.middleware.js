import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_sECRET);
  const user = await User.findById(payload?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;
  next();
});
