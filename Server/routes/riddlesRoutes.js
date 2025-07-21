import express from "express";
import {
  riddleById,
  newRiddle,
  allRiddles,
  updateRiddle,
  deleteRiddles,
} from "../controlers/riddlesControl.js";

const router = express.Router();

router.get("/", allRiddles);
router.get("/:id", riddleById);
router.post("/", newRiddle);
router.put("/:id", updateRiddle);
router.delete("/:id", deleteRiddles);

export default router;