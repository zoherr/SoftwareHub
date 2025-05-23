import Article from "../models/article.model.js";
import uploadToCloudinary from "../helper/uploadToCloudinary.js";
import fs from "fs"

export const createArticle = async (req, res, next) => {
    try {
        const { path } = req.file;
        const { url, public_id } = await uploadToCloudinary(path);
        const articleData = req.body;
        if (!articleData.title || !articleData.description) {
            return res.status(401).json({
                success: false,
                message: "Article Data not found",
            });
        }
        const article = await Article.create({ ...articleData, cover: url });
        await fs.unlink(path, (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.status(201).json({
            success: true,
            message: "Article created successfully",
            article
        });
    } catch (error) {
        next(error);
    }
}

export const getAllArticles = async (req, res, next) => {
    try {
        const { id } = req.query;
        const filter = id ? { software: id } : {};

        const articles = await Article.find(filter).populate("software");
        if (!articles) {
            return res.status(404).json({
                success: false,
                message: "No articles found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Articles fetched successfully",
            articles
        });
    } catch (error) {
        next(error);
    }
}

export const getSingleArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article
            .findById(id)
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Article fetched successfully",
            article
        });
    }
    catch (error) {
        next(error);
    }
}

export const updateArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article
            .findByIdAndUpdate(id, req.body, { new: true })
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Article updated successfully",
            article
        });
    }
    catch (error) {
        next(error);
    }
}

export const deleteArticle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article
            .findByIdAndDelete(id)
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Article deleted successfully",
            article
        });
    }
    catch (error) {
        next(error);
    }
}

