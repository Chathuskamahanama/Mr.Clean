import express from "express";
import {
  create,
  deactivate,
  get,
  location,
  locationSave,
  me,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/all", get);
router.post("/delete", deactivate);
router.get("/location", location);
router.put("/location/save", locationSave);
router.get("/me", me);

export default router;
