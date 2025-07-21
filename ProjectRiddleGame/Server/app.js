import express from "express";
import http from "http";
import { config } from "dotenv";
import routsinit from "./routes/confingRoutes.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
routsinit(app);

const server = http.createServer(app);
server.listen(PORT);
console.log(PORT);