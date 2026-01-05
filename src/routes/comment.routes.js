import Router from "express";
import {
    addComment,
    getVideoComments,
    deleteComment,
    updateComment
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/:videoId")
      .get(getVideoComments)
      .post(addComment);;

router.route("/:commentId")
      .patch(updateComment)
      .delete(deleteComment);

export default router;