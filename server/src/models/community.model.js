import mongoose, { Types, Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    sender: {
        type: Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    messages: messageSchema,
    cover: {
        type: String,
        required: true,
    },
    software: {
        type: Types.ObjectId,
        ref: "Software",
        unique: true,
        required: true
    },
    members: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });

const Community = mongoose.model("Community", communitySchema);
export default Community;