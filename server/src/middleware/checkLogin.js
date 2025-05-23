import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            req.user = null; 
            return next();
        }

        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
            if (err) {
                req.user = null;
                return next(); 
            }

            const user = await User.findById(payload.id).select("-password");
            req.user = user || null;
            return next();
        });
    } catch (err) {
        console.error("checkLogin error:", err);
        req.user = null;
        next();
    }
};
