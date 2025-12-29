import { asyncHandler } from "../utils/asyncHandler";
import Playlist from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose , {isValidObjectId} from "mongoose";
import { Video } from "../models/video.models.js";


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

    const playlist = await Playlist.create({
        name: trimmedName,
        description: trimmedDescription,
        owner: req.user._id,
        videos: videos || [],
    });


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
    const {playlistId} = req.params;

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid Playlist Id");
    }
    
    const playlist = await Playlist.findById(playlistId)
        .populate("videos")
        
    if(!playlist){
        throw new ApiError(404, "Playlist not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist retrieved successfully"));
});

const addVideosToPlaylist = asyncHandler(async (req, res) => {
    const {videoId, playlistId} = req.params;

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid Playlist Id or Video Id");
    }

    const video = await Video.findById(videoId);
    
    if(!video){
        throw new ApiError(404, "Video not found");
    }

    const playlist = await Playlist.findOneAndUpdate(
        {
            _id: playlistId,
            owner: req.user._id
        },
        {
            $addToSet: { videos: videoId }
        },
        { new: true }
    )

    if(!playlist){
        throw new ApiError(404, "Playlist not found or you are not the owner");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video added to playlist successfully"));
});

const removeVideosFromPlaylist = asyncHandler(async (req, res) => {
    const {videoId, playlistId} = req.params;

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid Playlist Id or Video Id");
    }

    const playlist = await Playlist.findOneAndUpdate(
        {
            _id: playlistId,
            owner: req.user._id
        },
        {
            $pull: { videos: videoId }
        },
        { new: true }
    )

    if(!playlist){
        throw new ApiError(404, "Playlist not found or you are not the owner");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));
});


//update playlist actually only name and description can be updated
const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const {name, description} = req.body; 

if(!isValidObjectId(playlistId) ){
    throw new ApiError(400, "Invalid Playlist Id");
}

const updateData = {};

if(name !== undefined){
    if(name.trim() !== ""){
        updateData.name = name.trim();
    }
}

if(description !== undefined){
    if(description.trim() !== ""){
        updateData.description = description.trim();
    }
}

if(!Object.keys(updateData).length){
    throw new ApiError(400, "No valid fields provided to update");
}

const currentPlaylist = await Playlist.findOne({
    _id: playlistId,
    owner: req.user._id
})

if(!currentPlaylist){
    throw new ApiError(404, "Playlist not found or you are not the owner");
}

if(updateData.name && updateData.name === currentPlaylist.name){
    throw new ApiError(409, " please provide a different name to update");
}

if(updateData.name){
    const duplicate = await Playlist.findOne({
        owner: req.user._id,
        _id: { $ne: playlistId },
        name: {$regex: new RegExp(`^${updateData.name}$`, 'i')}
    });

    if(duplicate){
    throw new ApiError(409, "A playlist with this name already exists for the user");
}
}


if(updateData?.name) currentPlaylist.name = updateData.name;
if(updateData?.description) currentPlaylist.description = updateData.description;

await currentPlaylist.save();   

return res
    .status(200)
    .json(new ApiResponse(200, currentPlaylist, "Playlist updated successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;

    if(!isValidObjectId(playlistId) ){
        throw new ApiError(400, "Invalid Playlist Id");
    }

    const deletedPlaylist = await Playlist.findOneAndDelete({
        _id: playlistId,
        owner: req.user._id
    });

    if(!deletedPlaylist){
        throw new ApiError(404, "Playlist not found or you are not the owner");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideosToPlaylist,
    removeVideosFromPlaylist
};

