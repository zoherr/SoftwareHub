import exoress from "express";
import { getMe } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/userVerify.js";

const userRouter = exoress.Router();
userRouter.get("/me", verifyToken, getMe);
export default userRouter;