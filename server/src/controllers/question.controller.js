import Question from "../models/question.model.js";

import { uploadToCloudinary } from '../utils/cloudinary.js'; // Adjust path as needed

export const createQuestion = async (req, res, next) => {
    try {
        const { question,software } = req.body;
        let images = [];

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                uploadToCloudinary(file.path)
            );

            const uploadedImages = await Promise.all(uploadPromises);

            images = uploadedImages.map(({ url, public_id }) => ({
                url,
            }));
        }

        const newQuestion = new Question({
            question,
            images,
            software
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        next(error);
    }
};
