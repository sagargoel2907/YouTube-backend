import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  console.log("received");
  throw Error("my error");
  res.status(200).json({
    message: "Success",
  });
});
