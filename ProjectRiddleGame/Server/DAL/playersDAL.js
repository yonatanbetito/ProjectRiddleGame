import { connect } from "../DB/mongoDB.js";

async function getNextPlayerId() {
  const db = await connect();
  const count = await db.collection("Players").countDocuments();
  return count + 1;
}

export async function readAllPlayers() {
  const db = await connect();
  return await db.collection("Players").find().toArray();
}

export async function readPlayerByUsername(username) {
  const db = await connect();
  return await db.collection("Players").findOne({ username });
}

export async function addPlayerToDB(player) {
  const db = await connect();
  const nextId = await getNextPlayerId();
  const playerWithId = {
    id: nextId,
    username: player.username,
    scores: player.scores,
    best_time: player.best_time,
    totalGames: player.totalGames,
    createdAt: player.createdAt,
  };
  const result = await db.collection("Players").insertOne(playerWithId);
  return playerWithId;
}

export async function addScoreToPlayer(username, score) {
  const db = await connect();
  const player = await db.collection("Players").findOne({ username });
  const newScores = [...(player.scores || []), score];
  const newBestTime = player.best_time
    ? Math.min(player.best_time, score.time)
    : score.time;
  const newTotalGames = (player.totalGames || 0) + 1;
  const updatedPlayer = {
    id: player.id,
    username: player.username,
    scores: newScores,
    best_time: newBestTime,
    totalGames: newTotalGames,
    createdAt: player.createdAt,
  };
  const result = await db
    .collection("Players")
    .findOneAndReplace({ username }, updatedPlayer, {
      returnDocument: "after",
    });
  return result.value;
}

export async function getLeaderboard() {
  const db = await connect();
  return await db
    .collection("Players")
    .find({ best_time: { $ne: null } })
    .sort({ best_time: 1 })
    .toArray();
}
