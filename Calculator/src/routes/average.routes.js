import express from "express";
import { getNumbers } from "../controllers/average.controllers.js";

const router = express.Router();
router.get("/numbers/:numberid", getNumbers);

export default router;
