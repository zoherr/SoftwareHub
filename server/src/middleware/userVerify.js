import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) return res.status(400).json({ success: false, message: "Token Not Found" })
  if (!token) console.log("Token Not Found")

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ success: false, message: "Token is not valid!" })
    const user = await User.findById(payload.id).select("-password");
    req.user = user;
    next()
  });
};
