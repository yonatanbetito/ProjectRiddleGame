import {
  readAllPlayers,
  readPlayerByName,
  addPlayerToDB,
  addScoreToPlayer,
  getLeaderboard,
} from "../DAL/playersDAL.js";

async function allPlayers(req, res) {
  try {
    const players = await readAllPlayers();
    res.json(players);
  } catch {
    res.status(500).send({ error: "server error" });
  }
}

async function newPlayer(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).send({ error: "name required" });
  try {
    const existingPlayer = await readPlayerByName(name);
    if (existingPlayer) {
      return res.json(existingPlayer);
    }

    const newPlayerData = {
      name: name,
      scores: [],
      best_time: null,
      totalGames: 0,
      createdAt: new Date(),
    };

    const result = await addPlayerToDB(newPlayerData);
    res.json(result);
  } catch {
    res.status(500).send({ error: "not save player" });
  }
}

async function playerByName(req, res) {
  try {
    const player = await readPlayerByName(req.params.player);
    if (!player) return res.status(404).json({ error: "not found" });
    res.json(player);
  } catch (err) {
    console.log("error server");
    res.status(500).send({ error: err.message});
  }
}

async function addScore(req, res) {
  const { name, riddleId, time } = req.body;
  try {
    const playerData = await readPlayerByName(name);
    if (!playerData) {
      return res.status(404).json({ error: "not found" });
    }
    const score = {
      riddleId,
      time,
      date: new Date(),
    };
    const result = await addScoreToPlayer(name, score);
    if (!result) {
      return res.status(404).json({ error: "player not found" });
    }
    res.json({ message: "best score saved", name: result });
  } catch (err) {
    console.log("error server");
    res.status(400).send({ error: err.message,});
  }
}

async function leaderboard(req, res) {
  try {
    const players = await getLeaderboard();
    res.json(players);
  } catch (err){
    console.log("error server");
    res.status(500).send({ error: err.message });
  }
}

export { allPlayers, newPlayer, playerByName, addScore, leaderboard };
