import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video

  // fetch the video attribute from the request
  // validate the values
  // upload video and thumbnail on cloudinary
  // create video and return the created video object in response
  const { title, description } = req.body;
  const localVideoPath = req.files?.videoFile?.[0]?.path;
  const localThumbnailPath = req.files?.thumbnail?.[0]?.path;

  if (
    [title, description, localVideoPath, localThumbnailPath].some((val) =>
      !val || !val.trim() ? 1 : 0
    )
  ) {
    throw new ApiError(400, "Missing data");
  }

  const videoFile = await uploadOnCloudinary(localVideoPath);
  const thumbnail = await uploadOnCloudinary(localThumbnailPath);
  if (!videoFile || !thumbnail) {
    throw new ApiError(
      500,
      "Something went wrong in uploading video and thumbnail to cloudinary"
    );
  }

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    owner: req.user?._id,
    title,
    description,
    duration: 0,
  });

  res
    .status(201)
    .json(new ApiResponse(201, video, "video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No video found with this videoId");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video does not exists");
  }
  if (video.owner != req.user?._id) {
    throw new ApiError(403, "Not authorized, video owner is different");
  }
  const { title, description } = req.body;
  const localThumbnailPath = req.file?.path;
  const thumbnail = uploadOnCloudinary(localThumbnailPath);

  // video.title = title ?? video.title;
  // video.description = description ?? video.description;
  // video.thumbnail = thumbnail?.url ?? video.thumbnail;
  // await video.save();

  const updatedVideo = await Video.findByIdAndUpdate(
    video._id,
    {
      $set: {
        title: title ?? video.title,
        description: description ?? video.description,
        thumbnail: thumbnail.url ?? video.thumbnail,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video does not exists");
  }
  if (video.owner != req.user?._id) {
    throw new ApiError(403, "Not authorized, video owner is different");
  }
  await video.remove();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video does not exists");
  }
  if (video.owner != req.user?._id) {
    throw new ApiError(403, "Not authorized, video owner is different");
  }
  const updatedVideo = await Video.findByIdAndUpdate(
    video._id,
    {
      $set: {
        isPublished: !video.isPublished,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideo, "Video status toggled successfully")
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
