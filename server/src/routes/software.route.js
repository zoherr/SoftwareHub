import express from "express";
import { addSoftware, getAllSoftware, getSingleSoftware, removeSoftware } from "../controllers/software.controller.js";
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/userVerify.js';
import upload from '../middleware/upload.js';

const softwareRouter = express.Router();

softwareRouter.post("/add", verifyToken, isAdmin, upload.single("icon"), addSoftware);
softwareRouter.get("/", getAllSoftware);
softwareRouter.delete("/delete/:id", verifyToken, isAdmin, removeSoftware);
softwareRouter.get("/:id", getSingleSoftware);

export default softwareRouter;