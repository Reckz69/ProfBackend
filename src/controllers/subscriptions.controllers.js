import { isValidObjectId } from "mongoose";
import { User } from "../models/user.models";
import { subscription } from "../models/channelSubscribed.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const toggleSubscription = asyncHandler(async(req, res) => {
    const {channelId} = req.params;
    if(!isValidObjectId(channelId)){
        throw new ApiError(400, "Invalid channel Id")
    }

    const user = await User.findById(channelId);

    if(!user){
        throw new ApiError(400, "User not Found");
    }

    if(channelId.toString() === req.user._id.toString()){
        throw new ApiError(
            400,
            "subscription error: self subcription not possible"
        );
    }

    const subscriptionRecord = await subscription.findOne({
        channelId: channelId,
        subscriber: req.user._id,
    })

    if(subscriptionRecord){
        await subscriptionRecord.deleteOne();

        res
        .status(200)
        .json(new ApiResponse(200, {}, "Subscription Removed Successsfully"))
    } 

    const newSubscription = await subscription.create({
        channelId: channelId,
        subscriber: req.user._id,
    }).select("__v");

    return res
    .status(200)
    .json(
        new ApiResponse(200, channelSubscribed, "subscriber addded successfully" )
    );
    });

//controller to return subscriber list of channels

const getUserChannelSubscribers = asyncHandler(async(req, res) => {
    const channelId = req.params;

    if(!isValidObjectId(channelId)){
        throw new ApiError("Invalid channelId")
    }

    const existingUser = await User.findById(channelId);

    if(!existingUser){
        throw new ApiError(400, "User not found")
    }

    const channelSubscribed = await subscription.find({
        channel: channelId
    }).populate({
        path: "subscriber",
        select: "-refreshToken, -password",
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, channelSubscribed, "channelSubscribed list fetched successfully")
    )

})

//getting the channels list of the user

const getSubscribedChannels = asyncHandler(async(req, res) => {
    const channelId = req.params;

    if(!isValidObjectId(channelId)){
        throw new ApiError("Invalid channelId")
    }

    const existingUser = await user.findById(channelId);

    if(!existingUser){
        throw new ApiError(400, "User not found")
    }

    const channelSubscribed = await subscription.find({
        subscriber: channelId
    }).populate({
        path: "channel",
        select: "-refreshToken, -password",
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, channelSubscribed, "channel Subscribed list fetched successfully")
    )

});

export{toggleSubscription, getSubscribedChannels, getUserChannelSubscribers}
