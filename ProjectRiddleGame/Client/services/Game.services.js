import { Riddle } from "../models/Riddle.js";
import { getAllRiddles } from "./Riddle.services.js";
import { submitScore, createPlayer } from "./Player.services.js";

const log_game = 2
export default async function startGame(name) {
  try {
    await createPlayer(name);

    const riddles = await getAllRiddles();
    console.log(`\nStarting game with ${riddles.length} riddles!\n`);
    
    for (let i = 0; i <log_game; i++) {
      const riddle = riddles[i];
      console.log(`\n--- Riddle ${i + 1} of ${log_game} ---`);

      const r = new Riddle(riddle);
      const start = Date.now();
      r.ask();
      const end = Date.now();
      const time = Math.floor((end - start) / 1000);

      await submitScore(name, riddle.id, time);
    }

    console.log("Congratulations! You and game!!");
  } catch (error) {
    console.log("Game error:", error.message);
  }
}
