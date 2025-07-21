import readlineSync from "readline-sync";

export class Riddle {
  constructor({ id, name, taskDescription, correctAnswer }) {
    this.id = id;
    this.name = name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
  }

  ask() {
    let response;
    while (response !== this.correctAnswer) {
      console.log(this.taskDescription);
      response = readlineSync.question("Enter your response: ");
      if (response === this.correctAnswer) {
        console.log("Correct!\n");
        return true;
      } else {
        console.log("Try again.\n");
      }
    }
  }
}