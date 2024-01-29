import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  changeAvatarImage,
  changeCoverImage,
  getUserChannelDetails,
  getUserWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/user-info").get(verifyJWT, getCurrentUser);
router.route("/update-details").patch(verifyJWT, updateUserDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), changeAvatarImage);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), changeCoverImage);
router.route("/channel/:username").get(verifyJWT, getUserChannelDetails);
router.route("/history").get(verifyJWT, getUserWatchHistory);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
