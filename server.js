const express = require("express");
const { db } = require("./src/config/db");
const ticketRoutes = require("./src/routes/ticket");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os = require("os");

dotenv.config();

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  const app = express();
  const port = 3000;

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.send("Server is running and healthy");
  });

  app.use("/", ticketRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  app.listen(port, async () => {
    await db();
    console.log(`Worker ${process.pid} is listening on port ${port}`);
  });
}
