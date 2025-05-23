import express from "express";
import { createCommunity,getAllCommunities, getSingleCommunity, joinCommunity, leaveCommunity } from "../controllers/community.controller.js";
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/userVerify.js';
import { checkLogin } from "../middleware/checkLogin.js";

const communityRouter = express.Router();

communityRouter.post("/create", verifyToken, isAdmin, createCommunity);
communityRouter.get("/", getAllCommunities);
communityRouter.get("/:id",checkLogin, getSingleCommunity);
communityRouter.put("/join/:id",verifyToken,joinCommunity)
communityRouter.put("/leave/:id",verifyToken,leaveCommunity)

export default communityRouter;