import express from 'express';
import { createArticle, deleteArticle, getAllArticles, getSingleArticle, updateArticle } from '../controllers/article.controller.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/userVerify.js';
import upload from '../middleware/upload.js';

const articleRouter = express.Router();

articleRouter.post('/create', verifyToken, isAdmin, upload.single('cover'), createArticle);
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getSingleArticle)
articleRouter.put("/update/:id", verifyToken, isAdmin, upload.single('cover'), updateArticle);
articleRouter.delete("/delete/:id", verifyToken, isAdmin, deleteArticle);

export default articleRouter;