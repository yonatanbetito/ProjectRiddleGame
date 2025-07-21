import { connect } from "../DB/mongoDB.js";

async function getNextRiddleId() {
  const db = await connect();
  const count = await db.collection("Riddles").countDocuments();
  return count + 1;
}

export async function readAllRiddles() {
  const db = await connect();
  return await db.collection("Riddles").find().toArray();
}

export async function readRiddleById(id) {
  const db = await connect();
  return await db.collection("Riddles").findOne({ id: parseInt(id) });
}

export async function addRiddleToDB(riddle) {
  const db = await connect();
  const nextId = await getNextRiddleId();
  const riddleWithId = {
    id: nextId,
    name: riddle.name,
    taskDescription: riddle.taskDescription,
    correctAnswer: riddle.correctAnswer,
  };
  const result = await db.collection("Riddles").insertOne(riddleWithId);
  return riddleWithId;
}

export async function updateRiddleInDB(id, updated) {
  const db = await connect();
  const collection = db.collection("Riddles");
  const existing = await collection.findOne({ id: parseInt(id) });
  if (!existing) throw new Error("not found");

  const updatedRiddle = {
    id: existing.id,
    name: updated.name ?? existing.name,
    taskDescription: updated.taskDescription ?? existing.taskDescription,
    correctAnswer: updated.correctAnswer ?? existing.correctAnswer,
  };

  await collection.findOneAndReplace({ id: existing.id }, updatedRiddle);
  return { message: "Updated successfully" };
}

export async function delRiddleById(id) {
  const db = await connect();
  return await db.collection("Riddles").deleteOne({ id: parseInt(id) });
}
