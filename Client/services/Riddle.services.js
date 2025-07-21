const BASE_URL = "http://localhost:3008/riddles";

async function getAllRiddles() {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (err) {
    console.log("error: failed to fetch riddles", err.message);
    return [];
  }
}

async function createRiddle(riddle) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(riddle),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to create riddle", err.message);
  }
}

async function updateRiddle(id, riddle) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(riddle),
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to update riddle", err.message);
  }
}

async function deleteRiddle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.log("error: failed to delete riddle", err.message);
  }
}

export { getAllRiddles, createRiddle, updateRiddle, deleteRiddle };