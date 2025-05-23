import express from "express";

const authRouter = express.Router();
import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/userVerify.js";


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put("/forgot-password", forgotPassword);
authRouter.put("/reset", resetPassword);
authRouter.post("/logout", logout);

export default authRouter;