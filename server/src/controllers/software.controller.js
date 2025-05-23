import uploadToCloudinary from "../helper/uploadToCloudinary.js";
import Article from "../models/article.model.js";
import Community from "../models/community.model.js";
import Software from "../models/software.model.js";
import fs from "fs"

export const addSoftware = async (req, res, next) => {
    const { path } = req.file;
    const { name } = req.body;
    try {
        const { url, public_id } = await uploadToCloudinary(path);

        const software = await Software.create({ name, icon: url });
        await fs.unlink(path, (err) => {
            if (err) {
                console.log(err);
            }
        })
        const community = await Community.create({
            name: software.name,
            cover: software.icon,
            software: software._id,
        });
        software.community = community._id;
        await software.save();
        res.status(201).json({ success: true, message: "Software created successfully", software });
    } catch (error) {
        next(error);
    }
}

export const getAllSoftware = async (req, res, next) => {
    try {
        const software = await Software.find();
        if (!software) {
            return res.status(404).json({ success: false, message: "No software found" });
        }
        res.status(200).json({ success: true, message: "Software fetched successfully", software });
    } catch (error) {
        next(error);
    }
}

export const removeSoftware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const software = await Software.findByIdAndDelete(id);
        if (!software) {
            return res.status(404).json({ success: false, message: "Software not found" });
        }
        const community = await Community.findOneAndDelete({ software: id });
        res.status(200).json({ success: true, message: "Software deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const getSingleSoftware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const software = await Software
            .findById(id)
        if (!software) {
            return res.status(404).json({ success: false, message: "Software not found" });
        }
        const articles = await Article.find({ software: id });
        res.status(200).json({ success: true, message: "Software fetched successfully", software, articles });
    } catch (error) {
        next(error);
    }
}