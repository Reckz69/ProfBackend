import { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

    const subscriptionRecord = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id,
    })

    if(subscriptionRecord){
        await subscriptionRecord.deleteOne();

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Subscription Removed Successfully"))
    } 

    const newSubscription = await Subscription.create({
        channel: channelId,
        subscriber: req.user._id,
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, newSubscription, "subscriber addded successfully" )
    );
    });

//controller to return subscriber list of channels

const getUserChannelSubscribers = asyncHandler(async(req, res) => {
    const {channelId} = req.params;

    if(!isValidObjectId(channelId)){
        throw new ApiError("Invalid channelId")
    }

    const existingUser = await User.findById(channelId);

    if(!existingUser){
        throw new ApiError(400, "User not found")
    }

    const channelSubscribed = await Subscription.find({
        channel: channelId
    }).populate({
        path: "subscriber",
        select: "-refreshToken, -password",
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, channelSubscribed, "channel Subscribers list fetched successfully")
    )

})

//getting the channels list of the user

const getSubscribedChannels = asyncHandler(async(req, res) => {
    const {channelId} = req.params;

    if(!isValidObjectId(channelId)){
        throw new ApiError("Invalid channelId")
    }

    const existingUser = await User.findById(channelId);

    if(!existingUser){
        throw new ApiError(400, "User not found")
    }

    const channelSubscribed = await Subscription.find({
        subscriber: channelId
    }).populate({
        path: "channel",
        select: "-refreshToken, -password",
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, channelSubscribed, "channels Subscribed list fetched successfully")
    )

});

export{toggleSubscription, getSubscribedChannels, getUserChannelSubscribers}
