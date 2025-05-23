import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String,
    cover: String,
    software: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Software"
    },
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);
export default Article