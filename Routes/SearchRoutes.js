import express from "express";
import { SearchAll } from "../Controller/SearchController.js";
const router = express.Router();

router.get('/search',SearchAll);
export default router;