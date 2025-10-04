import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User} from '../models/user.models.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async(req, res) => {
    
    const {fullName, username, email, password} = req.body;
    console.log("email: ", email); 

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
    if(!avataarLocalPath){
        throw new ApiError(400, 'Avataar is required'); // ⬅️ The error is pointing here!
    }

    // --- File Upload Logic ---
    let avataar = null;
    try {
        avataar = await uploadToCloudinary(avataarLocalPath);
    } catch (err) {
        console.error('Avataar upload error:', err);
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
    if(!avataar){
        console.error('Avataar upload failed for path:', avataarLocalPath);
        throw new ApiError(500, 'Avataar upload failed, please try again'); 
    }

    // --- DB Creation ---
    const user = await User.create({
        fullName,
        username : username.toLowerCase(),
        email,
        password,
        avataar: avataar.url,
        // Use optional chaining for safety
        coverImage: coverImage?.url || '', 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshTokens")

    if(!createdUser){
        throw new ApiError(500, 'User registration failed, please try again');
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User registered successfully')
    )
})

export { registerUser };