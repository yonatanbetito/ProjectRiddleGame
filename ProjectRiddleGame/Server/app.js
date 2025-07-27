import express from "express";
import http from "http";
import { config } from "dotenv";
import routsinit from "./routes/confingRoutes.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use((req, res, next) => {
  console.log("appening", req.method, req.url);
  next();
});
routsinit(app);

const server = http.createServer(app);
server.listen(PORT);
console.log(PORT);