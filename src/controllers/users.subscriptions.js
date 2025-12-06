import { isValidObjectId } from "mongoose";
import { User } from "../models/user.models";
import { subscription } from "../models/user.subscribers";
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

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribers, "subscriber list fetched successfully" )
    );

})