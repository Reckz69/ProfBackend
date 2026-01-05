import {Router} from 'express';
import {    registerUser,
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
         } from '../controllers/users.controllers.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/register').post(
    upload.fields([
           {
                name: "avataar",
                maxCount: 1
            },
            {
                name: "coverImage",
                maxCount: 1
            }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured Routes
router.route("/logout").post(verifyJWT, loggedOutUser )
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/me").get(verifyJWT, getCurrentUser)
router.route("/update/details").patch(verifyJWT, updateAccountDetails)
router.route("/update/avataar").patch(verifyJWT, upload.single("avataar"), updateAvataar)
router.route("/update/cover-image").patch(verifyJWT, upload.single("coverImage"), updateCoverImage)
router.route("/channel/:username").get(getUserChannelProfile)
router.route("/history").get(verifyJWT, getChannelHistory)

export default router;

