import { config } from "dotenv";
import { MongoClient } from "mongodb";
config();

const client = new MongoClient(process.env.DB_URL);
let db;

export async function connect() {
  if (!db) {
    await client.connect();
    db = client.db("GameRiddles");
    console.log("connected...");
  }
  return db;
}
