import {
  readAllPlayers,
  readPlayerByUsername,
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
  const { player } = req.body;

  if (!player) {
    return res.status(400).send({ error: "player required" });
  }

  try {
    const existingPlayer = await readPlayerByUsername(player);
    if (existingPlayer) {
      return res.json({ player });
    }

    const newPlayerData = {
      username: player,
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
  let player = req.params.player;
  try {
    const playerData = await readPlayerByUsername(player);

    if (!playerData) {
      return res.status(404).json({ error: "not found" });
    }

    res.json(playerData);
  } catch {
    res.status(500).send({ error: "server error" });
  }
}

async function addScore(req, res) {
  const { player, riddleId, time } = req.body;

  try {
    const playerData = await readPlayerByUsername(player);

    if (!playerData) {
      return res.status(404).json({ error: "not found" });
    }

    const score = {
      riddleId,
      time,
      date: new Date(),
    };

    const result = await addScoreToPlayer(player, score);
    res.json({ message: "best score saved", player: result });
  } catch {
    res.status(400).send({ error: "not save score" });
  }
}

async function leaderboard(req, res) {
  try {
    const players = await getLeaderboard();
    res.json(players);
  } catch {
    res.status(500).send({ error: "server error" });
  }
}

export { allPlayers, newPlayer, playerByName, addScore, leaderboard };
