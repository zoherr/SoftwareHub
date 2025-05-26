import express from 'express';
import { createQuestion } from '../controllers/question.controller.js';
import { multiupload } from '../middleware/multiUpload.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const questionRouter = express.Router();

questionRouter.post('/create', verifyToken,multiupload("images") ,createQuestion);

export default questionRouter;