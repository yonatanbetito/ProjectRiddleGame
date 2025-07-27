import { connect } from "../DB/mongoDB.js";

export async function getNextPlayerId() {
  try {
    const db = await connect();
    const count = await db.collection("Players").countDocuments();
    return count + 1;
  } catch (err) {
    console.error("getNextPlayerId error:", err);
    throw err;
  }
}

export async function readAllPlayers() {
  try {
    const db = await connect();
    return await db.collection("Players").find().toArray();
  } catch (err) {
    console.error("readAllPlayers error:", err);
    throw err;
  }
}

export async function readPlayerByName(name) {
  try {
    const db = await connect();
    return await db.collection("Players").findOne({ name });
  } catch (err) {
    console.error("readPlayerByName error:", err);
    throw err;
  }
}

export async function addPlayerToDB(player) {
  try {
    const db = await connect();
    const exists = await db
      .collection("Players")
      .findOne({ name: player.name });
    if (exists) return exists;

    const nextId = await getNextPlayerId();
    const playerWithId = {
      id: nextId,
      name: player.name,
      scores: player.scores || [],
      best_time: player.best_time || null,
      totalGames: player.totalGames || 0,
      createdAt: player.createdAt || new Date(),
    };

    await db.collection("Players").insertOne(playerWithId);
    return playerWithId;
  } catch (err) {
    console.error("addPlayerToDB error:", err);
    throw err;
  }
}

export async function addScoreToPlayer(playerName, score) {
  try {
    const db = await connect();
    const player = await db.collection("Players").findOne({ name: playerName });
    if (!player) return null;

    const scores = [...player.scores, score];
    const best_time =
      player.best_time === null || score.time < player.best_time
        ? score.time
        : player.best_time;
    const totalGames = (player.totalGames || 0) + 1;

    const result = await db.collection("Players").findOneAndUpdate(
      { name: playerName },
      {
        $set: {
          scores,
          best_time,
          totalGames,
        },
      },
      { returnDocument: "after" }
    );

    console.log(result.value);
    return result.value;
  } catch (err) {
    console.error("addScoreToPlayer error:", err);
    throw err;
  }
}

export async function getLeaderboard() {
  try {
    const db = await connect();
    return await db
      .collection("Players")
      .find({ best_time: { $ne: null } })
      .toArray();
  } catch (err) {
    console.error("getLeaderboard error:", err);
    throw err;
  }
}
