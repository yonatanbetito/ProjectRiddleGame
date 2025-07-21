const BASE_URL = "http://localhost:3008/players";

async function createPlayer(player) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ player }),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to create player", err.message);
  }
}

async function getPlayerStats(player) {
  try {
    const res = await fetch(`${BASE_URL}/${player}`);
    return await res.json();
  } catch (err) {
    console.log("error: failed to get player", err.message);
  }
}

async function getLeaderboard() {
  try {
    const res = await fetch(`${BASE_URL}/leaderboard`);
    return await res.json();
  } catch (err) {
    console.log("error: failed to get leaderboard", err.message);
  }
}

async function submitScore(player, riddleId, time) {
  try {
    const res = await fetch(`${BASE_URL}/submit-score`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ player, riddleId, time }),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to submit score -", err.message);
  }
}

export { createPlayer, getPlayerStats, getLeaderboard, submitScore };
