import { Comment } from "../models/comment.models";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import mongoose from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    if (!videoId || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video =  await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const option = { page: Number(page), limit: Number(limit)};

    const pipeline = [
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            },
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
        {
            $project: {
                "owner.password": 0,
                "owner.refreshToken": 0
            }           
        }
    ]

    const commentpaginate = await Comment.aggregatePaginate(
        Comment.aggregate(pipeline),
        option
    );

    return res
        .status(200)
        .json(new ApiResponse(200, commentpaginate, "Comments fetched successfully"));
});

const addComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!videoId || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (!content || !content.trim()) {
        throw new ApiError(400, "Content is required");
    }

    const comment = await Comment.create({
        content: content.trim(),
        video: videoId,
        owner: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "Comment added successfully"));
}); 

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    
    if (!commentId || !isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Comment Id");
    }

    const trimmedContent = content?.trim();

    if (!trimmedContent) {
        throw new ApiError(400, "Content is required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Check if the logged-in user is the owner of the comment

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment");
    }

   // Update comment content
    comment.content = trimmedContent;
    
    const updatedComment = await comment.save();

   
    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId || !isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Comment Id");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
    getVideoComments,
    addComments,
    updateComment,
    deleteComment
};