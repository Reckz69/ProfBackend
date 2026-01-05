import { asyncHandler } from "../utils/asyncHandler.js";   
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.models.js";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";
import { Subscription } from "../models/subscription.model.js";
import { isValidObjectId } from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
    const totalVideoViews = await Video.aggregate([
        {   $match:
            { owner: req.user._id }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" }
            }
        },
        {
            $project: {
                _id: 0,
            }
        }
    ]);

    const totalSubscribers = await Subscription.aggregate([
        {
            $match: {
                channel: req.user._id
            }
        },
        {
            $count: "totalSubscribers"
        }
    ]);

    const totalVideos = await Video.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $count: "totalVideos"
        }
    ]);

    const totalLikes = await Like.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video"
            }
        },
        {
            $unwind: "$video"
        },
        {
            $match: {
                "video.owner": req.user._id
            }
        },
        {
            $count: "totalLikes"
        }
    ]);

    const commentLikes = await Comment.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video"
            }
        },
        {
            $unwind: "$video"
        },
        {
            $match: {
                "video.owner": req.user._id
            }
        },
        {
            $count: "commentLikes"
        }
    ]);

    const tweetLikes = await Tweet.aggregate([
        {
            $lookup: {
                from: "tweets",
                localField: "tweet",
                foreignField: "_id",
                as: "tweet"
            }
        },
        {
            $unwind: "$tweet"
        },
        {
            $match: {
                "tweet.owner": req.user._id
            }
        },
        {
            $count: "tweetLikes"
        }
    ]);

    const channelStats = {
        totalVideoViews: totalVideoViews[0]?.totalViews ?? 0,
        totalSubscribers: totalSubscribers[0]?.totalSubscribers ?? 0,
        totalVideos: totalVideos[0]?.totalVideos ?? 0,
        totalLikes: totalLikes[0]?.totalLikes ?? 0,
        commentLikes: commentLikes[0]?.commentLikes ?? 0,
        tweetLikes: tweetLikes[0]?.tweetLikes ?? 0
    };

    return res
        .status(200)
        .json(new ApiResponse(200, channelStats, "Dashboard stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid Channel Id");
    }

    const videos = await Video.find({ owner: channelId });

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export {
    getChannelStats,
    getChannelVideos
};

