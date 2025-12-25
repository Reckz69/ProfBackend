import { asyncHandler } from "../utils/asyncHandler";
import Playlist from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { JsonWebTokenError } from "jsonwebtoken";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description, videos } = req.body;
    const owner = req.user._id; //the router middleware auth.js has added the user to req object

    const trimmedName = name?.toLowerCase().trim();
    const trimmedDescription = description?.toLowerCase().trim();

    // Validate name and description
    if (!trimmedName || !trimmedDescription) {
        throw new ApiError(400, "Name and description are required");
    }

    const existingPlaylist = await Playlist.findOne({ 
        name: trimmedName, 
        owner: owner 
    });

    if (existingPlaylist) {
        throw new ApiError(409, "A playlist with this name already exists for the user");
    }


    // Validate videos
    if (videos && !Array.isArray(videos)) {
        throw new ApiError(400, "Videos must be an array of video IDs");
    }

    const playlist = new Playlist({
        name: trimmedName,
        description: trimmedDescription,
        owner
    });

    await playlist.save();

    return res
        .status(201)
        .json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params;

    if(!userId?.trim()){
        throw new ApiError(400, "User Id is required");
    }

    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid User Id");
    }

    const userplaylists = await Playlist.find({
        owner: userId,
    })

    return res
        .status(200)
        .json(new ApiResponse(200, userplaylists, "Playlists retrieved successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {

    
})