
export const isAdmin = (req, res, next) => {
    const user = req.user.role;

    if (user !== "admin") return res.status(400).json({ success: false, message: "You are not authorized!!" });

    next();

};
