import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { log } from "console";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
    try {
        const { username, fullName, email, password } = req.body;
        if (!username || !fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const exists = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (exists) {
            return res.status(400).json({ success: false, message: "Username or email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            fullName,
            email,
            password: hash
        });

        res.status(201).json({ success: true, message: "New User Created Successfully!!", user });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        console.log(req.body);

        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY,);

        res.status(200).cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        }).json({ success: true, token })

    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        }).status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Email Exist" });

        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetExpires = Date.now() + 1000 * 60 * 15; // 15 min
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/auth/reset?token=${token}&id=${user._id}`;
        await sendEmail({
            to: user.email,
            subject: "Password Reset Instructions",
            html: `
        <p>Hello ${user.name || ""},</p>
        <p>Click the link below (valid for 15 minutes) to set a new password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn’t request this, just ignore this email.</p>
      `,
            text: `Reset your password: ${resetUrl}`,
        });

        res.json({ success: true, message: "If that email exists, we sent a reset link." });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { id, token, newPassword } = req.body;
        console.log(req.body);
        if (!id || !token || !newPassword)
            return res.status(400).json({ success: false, message: "Missing fields" });

        const user = await User.findOne({
            _id: id,
            resetToken: token,
            resetExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetExpires = undefined;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

