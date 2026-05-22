import express from "express";
import { getAllCityLogs, logSelectedCity } from "../controllers/logController.js";

const router = express.Router();

router.get("/", getAllCityLogs);
router.post("/city", logSelectedCity);

export default router;
