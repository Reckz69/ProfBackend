import { Tweet } from "../models/tweet.models.js";
import { Comment } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;
    
    if (!videoId?.trim() || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Video Id is required");
    }

    const Likevideo = await Like.findOne({
        video: videoId,
        likedBy: userId
    });

    if(!Likevideo){

        const video = await Video.findById(videoId);

        if(!video){
            throw new ApiError(404, "Video not found");
        }

        const newLikeVideo = await Like.create({
            video: videoId,
            likedBy: userId
        });

        return res
            .status(201)
            .json(new ApiResponse(201, newLikeVideo, "Video Added to Liked videos successfully"));
    }

    await Likevideo.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Video removed from Liked videos successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user._id;
    
    if (!tweetId?.trim() || !isValidObjectId(tweetId)) {
        throw new ApiError(400, "Tweet Id is required");
    }

    const likeTweet = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    });

    if(!likeTweet){

        const tweet = await Tweet.findById(tweetId);

        if(!tweet){
            throw new ApiError(404, "Tweet not found");
        }

        const newLikeTweet = await Like.create({
            tweet: tweetId,
            likedBy: userId
        });

        return res
            .status(201)
            .json(new ApiResponse(201, newLikeTweet, "Tweet Liked successfully"));
    }

    await likeTweet.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Tweet Unliked successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    
    if (!commentId?.trim() || !isValidObjectId(commentId)) {
        throw new ApiError(400, "Comment Id is required");
    }

    const likeComment = await Like.findOne({
        comment: commentId,
        likedBy: userId
    });

    if(!likeComment){

        const comment = await Comment.findById(commentId);

        if(!comment){
            throw new ApiError(404, "Comment not found");
        }

        const newLikeComment = await Like.create({
            comment: commentId,
            likedBy: userId
        });

        return res
            .status(201)
            .json(new ApiResponse(201, newLikeComment, "Comment Liked successfully"));
    }

    await likeComment.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment Unliked successfully"));
});

const getUserLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const likedVideos = await Like.find({
        likedBy: userId,
        video: { $ne: null }
    }).populate("video");
    
    const videos = likedVideos.map(like => like.video); 
    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Liked videos fetched successfully"));
});

export {
    toggleVideoLike,
    toggleTweetLike,    
    toggleCommentLike,
    getUserLikedVideos,
};
