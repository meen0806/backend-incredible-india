import express from "express";
import { uploadImage } from "../Controller/imageUploadController.js";

const router = express.Router();


router.post("/upload-image", uploadImage);

export default router;
