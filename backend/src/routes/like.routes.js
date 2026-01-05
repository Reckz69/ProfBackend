import { Router } from "express";   
import{
    toggleVideoLike,
    getLikedVideos,
    toggleTweetLike,
    toggleCommentLike
}   from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/video/:videoId")
      .post(toggleVideoLike);

router.route("/videos")
      .get(getLikedVideos);

router.route("/tweet/:tweetId")
      .post(toggleTweetLike);

router.route("/comment/:commentId")
      .post(toggleCommentLike);

export default router;