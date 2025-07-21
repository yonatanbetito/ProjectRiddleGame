import express from "express";
import {
  allPlayers,
  newPlayer,
  playerByName,
  addScore,
  leaderboard,
} from "../controlers/playersControl.js";

const router = express.Router();

router.get("/", allPlayers);
router.post("/", newPlayer);
router.post("/submit-score", addScore);
router.get("/leaderboard", leaderboard);
router.get("/:player", playerByName);

export default router;
