import Community from "../models/community.model.js";
import Software from "../models/software.model.js";

export const createCommunity = async (req, res, next) => {
    try {
        const { software } = req.body;

        const softwareData = await Software.findById(software);

        if (!softwareData) {
            return res.status(404).json({
                success: false,
                message: "Software not found",
            });
        }

        const community = await Community.create({
            name: softwareData.name,
            cover: softwareData.icon,
            software: softwareData._id,
        });

        softwareData.community = community._id;
        await softwareData.save();
        res.status(201).json({
            success: true,
            message: "Community created successfully",
            community
        });
    } catch (error) {
        next(error);
    }
}

export const getAllCommunities = async (req, res, next) => {
    try {
        const communities = await Community.find();
        if (!communities) {
            return res.status(404).json({
                success: false,
                message: "No communities found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Communities fetched successfully",
            communities
        });
    } catch (error) {
        next(error);
    }
}

export const getSingleCommunity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId  = req?.user?._id;
        const community = await Community
            .findById(id)
        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found",
            });
        }
        let isJoined = false;
        if (userId) {
            isJoined = community.members.includes(userId);
        }
        res.status(200).json({
            success: true,
            message: "Community fetched successfully",
            community,
            isJoined
        });

    }
    catch (error) {
        next(error);
    }
}

export const joinCommunity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const community = await Community.findOneAndUpdate(
            { _id: id, members: { $ne: userId } },
            { $addToSet: { members: userId } },
            { new: true }
        );

        if (!community) {
            return res.status(400).json({
                success: false,
                message: "Community not found or user already a member",
            });
        }

        res.status(200).json({
            success: true,
            message: "User joined the community successfully",
            community,
        });
    } catch (error) {
        next(error);
    }
};

export const leaveCommunity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const community = await Community.findOneAndUpdate(
            { _id: id, members: userId },
            { $pull: { members: userId } },
            { new: true }
        );

        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found or user is not a member",
            });
        }

        res.status(200).json({
            success: true,
            message: "User left the community successfully",
            community,
        });
    } catch (error) {
        next(error);
    }
};