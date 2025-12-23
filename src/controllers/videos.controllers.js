import mongoose, {isValidObjectId, Schema} from "mongoose";
import {Video} from '../modeles/video.modeles.js';
import { ApiError } from "../utils/ApiError.js";    
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteImageFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async(req, res) => {
    const {page = 1, limit= 10, query, sortBy, sortType, userId} = req.query;

    const match = {
        isPublished: true
    };
    const sort = {}
    const options = {page: Number(page), limit: Number(limit)}

    if(query?.trim()) match.title = {$regex: query.trim(), $options: "i"};
    if(userId){
        if(!isValidObjectId(userId)){
            throw new ApiError(400, "Invalid User Id")
        }
        const user = await User.findById(userId)

        if(!user){
            throw new ApiError(404, "user not found")
        }

        match["owner._id"] = new mongoose.Types.ObjectId(userId)
    }
    if(sortBy && typeof sortBy == "string"){
        const sortOrder = sortType?.toLowerCase() == "asc"? 1 : -1;
        sort[sortBy] = sortOrder;
    }

    const pipeline = [
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            }
        },
        {
            $addFields:
            {
                owner:
                {
                    $first: "$owner",
                },
            },
        },
        {
            $project:
            {
                "owner.refreshToken":0, 
                "owner.password": 0
            }
        }
    ];

    if(userId){
        pipeline.push({
            $match: match,
        })
    }else{
        pipeline.unshift({
            $match: match   
        })
    }

    if(Object.keys(sort).length > 0 ){
        pipeline.push({
            $sort: sort
        })
    }

    const videoAggregation = Video.aggregate(pipeline)
    const paginatedVideos = await Video.aggregatePaginate(
        videoAggregation,
        options
    );

    return res
    .status(200)
    .json(new ApiResponse(200, paginatedVideos, "v fetched successfully"))
})

const publishVideo = asyncHandler(async(req, res) => {
    const {title, description} = req.body;

    if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
    }

    if(!title?.trim() || !description?.trim()){
        throw new ApiError(400, "All fields are required")
    }

    const videoFileLocationPath = req.files?.videoFile?.[0]?.path
    const thumbnailLocationPath = req.files?.thumbnail?.[0]?.path

    if(!videoFileLocationPath || !thumbnailLocationPath){
        throw new ApiError(400,"need to upload v and Thumbnail both ")
    }

    const [videoFile, thumbnail] = await Promise.all([
        uploadToCloudinary(videoFileLocationPath),
        uploadToCloudinary(thumbnailLocationPath),
    ]);

    if(!videoFile?.url){
        throw new ApiError(400, "Failed to upload the video to cloudinary")
    }

    if(!thumbnail?.url){
        throw new ApiError(400, "Failed to upload the thumbnail image to cloudinary")
    }

    const createdVideo = await Video.create(
        {
            videoFile: videoFile.url,
            thumbnail: thumbnail.url,
            title: title?.trim(),
            description: description?.trim(),
            duration: videoFile.duration,
            owner: req.user?._id,
        }
    )
    return res
        .status(201)
        .json(new ApiResponse(201, createdVideo, "Video uploaded successfully"));    
});

const getVideoById = asyncHandler(async(req, res) => {
    const {videoId} = req.param

    if(!video?.trim()){
        throw new ApiError(401,"Video Id is required" )
    }
    
    const video = await Video.aggregate([
        {
            $match: {
            _id: new mongoose.Types.ObjectId(videoId),
            },
        },
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as:"owner"
            },
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner",
                },
            },
        },
        {
            $project:{
                "owner.refreshToken": 0,
                "owner.password" : 0
            },
        },
    ])

    if(!video){
        throw new ApiError(401, "Enter Valid Id")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video[0], "Video retrieved successfully"));

});

const updateVideo = asyncHandler(async(req, res) => {
    const videoId = req.params;

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(400, "video not found")
    }

    const {title, description} = req.body;

    const updateData = {}

    if(title !== undefined){
        if(typeof title !== "string" || title.trim() === ""){
            throw new ApiError(400, "title must be a non empty string")
        }
        updateData.title = title.trim()
    }

    if(description !== undefined){
        if(typeof description !== "string" || description.trim() === ""){
            throw new ApiError(400, "description must be a non empty string")
        }
        updateData.description = description.trim()
    }

    if(req.file?.path){

        const thumbnailLocalPath = req.file.path;

        const thumbnail = await uploadToCloudinary(thumbnailLocalPath);

        if(!thumbnail){
            throw new ApiError(500, "Failed to upload humbnail image to cloudinary")
        }

        const isOldThumbnailDeleted = await deleteImageFromCloudinary(video.thumbnail)

        if (!isOldThumbnailDeleted) {
            throw new ApiError(
            500,
            "Something went wrong while deleting old thumbnail"
            );
        }

        updateData.thumbnail = thumbnail.url;

    }

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No valid fields provided to update");
    }

    const updatedVideo = await Video.findbyIdAndUpdate(
        videoId,
        {
            $set: updateData
        },
        {
            new: true,
        }
    ); 
    
    if(!updatedVideo){
        throw new ApiError(500, "something went wrong while updating the video")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "Video is updated successfully"))
    
})








export{
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,

}