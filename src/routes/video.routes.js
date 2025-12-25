import { Router } from "express";
import { 
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePubllishedStatus,
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
    
router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router
    .route("/toggle/publish/:videoId").patch(togglePubllishedStatus);

export default router
    

    

