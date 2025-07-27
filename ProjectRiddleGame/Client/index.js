import readlineSync from "readline-sync";
import { getLeaderboard } from "./services/Player.services.js";
import {
  getAllRiddles,
  createRiddle,
  updateRiddle,
  deleteRiddle,
} from "./services/Riddle.services.js";
import startGame from "./services/Game.services.js";

async function main() {
  let exit = false;
  while (!exit) {
    console.log(`What do you want to do?
1. Play the game
2. Create a new riddle
3. Read all riddles
4. Update a riddle
5. Delete a riddle
6. View leaderboard
7. Exit
`);
    const operation = readlineSync.question("Enter operation 1-7: ");
    switch (operation) {
      case "1":
        const name = readlineSync.question("Enter your name: ");
        await startGame(name);
        break;
      case "2":
        const riddleName = readlineSync.question("Enter riddle name: ");
        const riddleTask = readlineSync.question("Enter description: ");
        const riddleAnswer = readlineSync.question("Enter correct answer: ");
        await createRiddle({
          name: riddleName,
          taskDescription: riddleTask,
          correctAnswer: riddleAnswer,
        });
        break;
      case "3":
        const riddles = await getAllRiddles();
        riddles.forEach((r) => {
          console.log(`Id: ${r.id}`);
          console.log(`Name: ${r.name}`);
          console.log(`Ridlle: ${r.taskDescription}`);
          console.log(`Answer: ${r.correctAnswer}\n`);
        });
        break;
      case "4":
        const updateId = readlineSync.question("Enter riddle ID to update: ");
        const newName = readlineSync.question("Enter new name: ");
        const newDesc = readlineSync.question("Enter new description: ");
        const newAnswer = readlineSync.question("Enter new answer: ");
        await updateRiddle(updateId, {
          name: newName,
          taskDescription: newDesc,
          correctAnswer: newAnswer,
        });
        break;
      case "5":
        const deleteId = readlineSync.question("Enter riddle ID to delete: ");
        await deleteRiddle(deleteId);
        break;
      case "6":
        const leaderboard = await getLeaderboard();
        leaderboard.forEach((entry) => {
          console.log(`Player: ${entry.name}, bestTime: ${entry.best_time}s`);
        });
        break;
      case "7":
        exit = true;
        console.log("log out..,");
        break;
      default:
        console.log("Invalid operation.");
    }
  }
}

main();
