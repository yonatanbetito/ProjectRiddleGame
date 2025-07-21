import {
  readAllRiddles,
  readRiddleById,
  delRiddleById,
  addRiddleToDB,
  updateRiddleInDB,
} from "../DAL/riddlesDAL.js";

async function allRiddles(req, res) {
  try {
    const riddles = await readAllRiddles();
    res.json(riddles);
  } catch {
    res.status(500).send({ error: "server error" });
  }
}

async function riddleById(req, res) {
  let id = req.params.id;
  try {
    const riddle = await readRiddleById(id);
    if (!riddle) {
      return res.status(404).json({ error: "not found" });
    }
    res.json(riddle);
  } catch {
    res.status(500).send({ error: "server error" });
  }
}

async function newRiddle(req, res) {
  const riddle = req.body;
  if (!riddle.name || !riddle.taskDescription || !riddle.correctAnswer) {
    return res.status(400).send({ error: "required fields missing" });
  }
  try {
    const result = await addRiddleToDB(riddle);
    res.json(result);
  } catch {
    res.status(500).send({ error: "not save riddle" });
  }
}

async function updateRiddle(req, res) {
  const id = req.params.id;
  const updated = req.body;
  try {
    const result = await updateRiddleInDB(id, updated);
    if (!result) {
      return res.status(404).json({ error: "ridlle not found" });
    }
    res.json(result);
  } catch {
    res.status(400).send({ error: "riddle not updated" });
  }
}

async function deleteRiddles(req, res) {
  let id = req.params.id;
  try {
    const result = await delRiddleById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "not found" });
    }
    res.send({ mssg: "deleted" });
  } catch {
    res.status(400).send({ error: "not deleted" });
  }
}

export { riddleById, newRiddle, allRiddles, updateRiddle, deleteRiddles };