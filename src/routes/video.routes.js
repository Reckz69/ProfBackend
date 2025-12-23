import { Router } from "express";
import { 
    getAllVideos,
    publishVideo,
 } from "../controllers/videos.controllers";

 import { verifyJWT } from "../middlewares/auth.middleware";
 import { upload } from "../middlewares/multer.middleware";

 const router = Router();
 router.use(verifyJWT);

 router
 .route("/")
 .get(getAllVideos)
 .post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        }
    ]),
    publishVideo
    )