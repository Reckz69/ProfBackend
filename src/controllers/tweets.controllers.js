import mongoose, {isValidObjectId} from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const owner = req.user._id; //the router middleware auth.js has added the user to req object

    const trimmedContent = content?.trim();

    // Validate content
    if (!trimmedContent) {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.create({
        content: trimmedContent,
        owner: owner,
    });

    if (!tweet) {
        throw new ApiError(500, "Failed to create tweet");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId?.trim()) {
        throw new ApiError(400, "User Id is required");
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const userTweets = await Tweet.find({
        owner: userId,
    }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, userTweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!tweetId?.trim()) {
        throw new ApiError(400, "Tweet Id is required");
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid Tweet Id");
    }

    const trimmedContent = content?.trim();

    if (!trimmedContent) {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.findOneAndUpdate({
        _id: tweetId,
        owner: req.user._id,
    }, {
        content: trimmedContent
    }, {
        new: true
    });

    if (!tweet) {
        throw new ApiError(404, "Tweet not found or you are not the owner");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId?.trim()) {
        throw new ApiError(400, "Tweet Id is required");
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid Tweet Id");
    }

    const tweet = await Tweet.findOneAndDelete({
        _id: tweetId,
        owner: req.user._id,
    });

    if (!tweet) {
        throw new ApiError(404, "Tweet not found or you are not the owner");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
};
