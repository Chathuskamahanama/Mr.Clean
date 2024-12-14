import express from "express";
import { create, get } from "../controllers/service.type.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/all", get);

export default router;
