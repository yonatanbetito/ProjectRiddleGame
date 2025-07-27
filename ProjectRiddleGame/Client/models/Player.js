export class Player {
  constructor(username) {
    this.username = username;
    this.scores = [];
    this.best_time = null;
    this.totalGames = 0;
    this.createdAt = new Date();
  }

  getTotalScore() {
    return this.scores.reduce((sum, score) => sum + score.time, 0);
  }

  addScore(riddleId, time) {
    const score = {
      riddleId,
      time,
      date: new Date(),
    };
    this.scores.push(score);
    this.totalGames++;
    if (this.best_time === null || time < this.best_time) {
      this.best_time = time;
    }
    return score;
  }

  getAverageTime() {
    if (this.scores.length === 0) return null;
    const totalTime = this.scores.reduce((sum, score) => sum + score.time, 0);
    return totalTime / this.scores.length;
  }
}
