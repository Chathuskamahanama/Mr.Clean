import express from "express";
import {
  create,
  get,
  updateStatus,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/get", get);
router.put("/status", updateStatus);

export default router;
