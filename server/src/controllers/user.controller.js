import User from "../models/user.model.js";

export const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};