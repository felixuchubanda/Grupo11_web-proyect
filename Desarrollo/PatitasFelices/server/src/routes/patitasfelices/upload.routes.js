// src/routes/patitasfelices/upload.routes.js
import express from 'express';
import { uploadFile } from '../../controllers/patitasfelices/upload.controller.js';
import upload from '../../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadFile);

export default router;
