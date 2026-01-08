import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User} from '../models/user.models.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { Subscription } from '../models/subscription.model.js';
import mongoose from 'mongoose';

const generateAccessandRefreshToken = async(userId) => {
    try {
        
        const user = await User.findById(userId)

        if(!user){
            throw new ApiError(404, "User not found")
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return{accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Error while generating Access or Refresh Tokens")
    }
}
const registerUser = asyncHandler(async(req, res) => {
    
    const {fullName, username, email, password} = req.body;
    // console.log("email: ", email); 

    if (
        [fullName, username, email, password].some((fields) => fields?.trim() === '')
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, 'User already exists with this email or username')
    }

    // --- Core Fix for the 'avatar is required' Error ---
    // If you are using upload.fields(), Multer puts files here:
    // This line is where your original error was thrown (Line 52)
    const avataarLocalPath = req.files?.avataar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // Check for required avataar (This is the original check)
 //   if (!avataarLocalPath) {
 //       throw new ApiError(400, 'Avataar file is required');
 //   }

    // --- File Upload Logic ---
    let avataar = null;
    if (avataarLocalPath){
        try {
            avataar = await uploadToCloudinary(avataarLocalPath);
        } catch (err) {
            console.error('Avataar upload error:', err);
        }
    }

    let coverImage = null;
    if (coverImageLocalPath) {
        try {
            coverImage = await uploadToCloudinary(coverImageLocalPath);
        } catch (err) {
            console.error('Cover image upload error:', err);
        }
    }

    // Check if the required avataar upload was successful
    //if(!avataar){
       // console.error('Avataar upload failed for path:', avataarLocalPath);
       // throw new ApiError(500, 'Avataar upload failed, please try again'); 
    //}

    // --- DB Creation ---
    const user = await User.create({
        fullName,
        username : username,
        email,
        password,
        avataar: avataar?.url,
        // Use optional chaining for safety
        coverImage: coverImage?.url || '', 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshTokens")

    if(!createdUser){
        throw new ApiError(500, 'User registration failed, please try again');
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User registered successfully')
    )
})

const loginUser = asyncHandler(async(req, res) => {
    //req body => data
    //username or email
    //password
    //access and refresh token
    //send cookies
    
    const {email, username, password} = req.body
    // console.log(email)

    if(!email && !username){
        throw new ApiError(400, "username or email id is required")
    }

    const user = await User.findOne({
        $or : [{username}, {email}]
    })
    
    if(!user){
        throw new ApiError(404, "user not found")
    }

    const validPassword = await user.isPasswordCorrect(password)

    if(!validPassword){
        throw new ApiError(404, "Enteer valid password")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure: true
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully "
        )
    )

})

const loggedOutUser = asyncHandler(async(req, res) => {
   
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
           
        },
        {
            new: true
        }
    )

    console.log(req.user)

    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))

})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    }
    
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is used or expired")
        }
    
        const options = {
            httpOnly : true,
            secure: true
        }
    
       const {accessToken, newRefreshToken} = await generateAccessandRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse(
            200,
            {accessToken, refreshToken: newRefreshToken},
            "Access Token refreshed successfully"
        ))
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid Refresh Token")
    }


})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const{oldPassword, newPassword} = req.body
    
    const user = await User.findById(req.user?._id).select("+password")

    if(!user){
        throw new ApiError(404, "User not found")
    }   
    
    const isPasswordCorrect = await user.
    isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed Successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .set("Cache-Control", "no-store")
    .json(new ApiResponse(200, req.user, "current user fetched successfully"))

})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if(!fullName || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email: email
            }

        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully" ))
})

const updateAvataar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadToCloudinary(avatarLocalPath)
    
    if(!avatar.url){
        throw new ApiError(400, "Error whileu uploading on avataar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar : avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Avataar uploaded successsfully"))


})

const updateCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path
    if(!coverImageLocalPath){
        throw new ApiError(400, "coverImage file is missing")
    }

    const coverImage = await uploadToCloudinary(coverImageLocalPath)
    
    if(!coverImage.url){
        throw new ApiError(400, "Error whileu uploading on avataar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage : coverImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "cover imaage uploaded successsfully"))

})

const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if(!username?.trim()){
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField: "_id",
                foreignField:"subscriber",
                as:"subcribedTo"
            }
        },
        {
            $addFields:{
                subscriberCount:{
                    $size:{$ifNull: ["$subscribers", []] }
                },
                channelssubscribedToCount:{
                    $size: {$ifNull: ["$subcribedTo", []] }
                },
                isSubscribed:{
                    $cond:{
                        if: {$in: [req.user?._id, {$ifNull: ["$subscribers.subscriber", []] } ]  },
                        then: true,
                        else: false
                    }

                }
            }
        },
        {
            $project:{
                fullName: 1,
                userName: 1,
                subscriberCount: 1,
                channelssubscribedToCount: 1,
                isSucbsribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ])

    if(!channel?.length){
    throw new ApiError(404, "channel Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User Channel fetched successfully")
    )
})

const getChannelHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup:{
                            from: "users",
                            localField:"owner",
                            foreignField:"_id",
                            as: "owner",
                            pipeline:[
                               { $project:{
                                    fullName: 1,
                                    username : 1,
                                    avataar : 1
                                }}
                            ]
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner:{
                    $first: "$owner"
                }
            } 
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch History fetched successfully"
    )
    )
})



export {    
    registerUser,
    loginUser, 
    loggedOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvataar,
    updateCoverImage, 
    getUserChannelProfile ,
    getChannelHistory   
};