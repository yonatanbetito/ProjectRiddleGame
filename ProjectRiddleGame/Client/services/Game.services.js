import { Riddle } from "../models/Riddle.js";
import readlineSync from "readline-sync";
import { getAllRiddles } from "./Riddle.services.js";
import { submitScore, createPlayer } from "./Player.services.js";

export default async function startGame(player) {
  try {
    await createPlayer(player);

    const riddles = await getAllRiddles();
    console.log(`\nStarting game with ${riddles.length} riddles!\n`);

    for (let i = 0; i < riddles.length; i++) {
      const riddle = riddles[i];
      console.log(`\n--- Riddle ${i + 1} of ${riddles.length} ---`);

      const r = new Riddle(riddle);
      const start = Date.now();
      r.ask();
      const end = Date.now();
      const time = Math.floor((end - start) / 1000);

      await submitScore(player, riddle.id, time);
      // console.log(`Time for this riddle: ${time}s`);
    }

    console.log("Congratulations! You and game!!");
  } catch (error) {
    console.log("Game error:", error.message);
  }
}
