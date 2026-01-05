import { Router } from "express";
import {
    toggleSubscription, 
    getSubscribedChannels,
    getUserChannelSubscribers
} from "../controllers/subscriptions.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

router.route("/s/:channelId")
    .get(getUserChannelSubscribers);
    
export default router;