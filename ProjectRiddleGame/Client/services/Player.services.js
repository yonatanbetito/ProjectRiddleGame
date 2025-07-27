import fetch from "node-fetch";

const BASE_URL = "http://localhost:3008/players";

async function createPlayer(name) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({name}),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to create player", err.message);
    throw err;
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

async function submitScore(name, riddleId, time) {
  try {
    const res = await fetch(`${BASE_URL}/submit-score`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, riddleId, time }),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to submit score -", err.message);
  }
}

export { createPlayer, getLeaderboard, submitScore };
