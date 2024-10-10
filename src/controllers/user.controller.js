import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError";
import { User } from '../model/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const registerUser = asyncHandler(async (req, res) => {
  
    // get user details from fronend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar check
    // create user object - create entry in Db
    // remove password and refresh token field from response
    // check for user creation
    // return response 00or error

    const {fullname, email, username, password} = req.body;

    if (
        [fullname, email, username, password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = User.findOne( {$or : [{ username }, { email }]}
    )

    if(existedUser){
        throw new ApiError(409,"user with same username or email allready exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, 'Avatar file is required')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, 'Avatar file is required')
    }

    console.log("email", email)
    User.create({fullname: email, avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById.(user._id).select(
        "-password -refreshToken"
    )

    if(!createdeUser){
        throw new ApiError(500, "Failed to create user")
    }
})

export {registerUser}