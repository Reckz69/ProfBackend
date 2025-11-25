import {Router} from 'express';
import { loginUser, 
    registerUser, 
    loggedOutUser,
    refreshAccessToken    } from '../controllers/users.controllers.js';
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

export default router;

