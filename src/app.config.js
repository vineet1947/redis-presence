const config = require("@colyseus/tools").default;
const { monitor } = require("@colyseus/monitor");
const { playground } = require("@colyseus/playground");
const { roomHandler } = require("./controllers/room.controller");
const { RedisPresence } = require("@colyseus/redis-presence");
const { generateToken } = require("./services/acs.service");
const express = require("express");
const Redis = require("ioredis"); // Import the ioredis library

module.exports = config({
  options: {
    presence: new RedisPresence({
      host: "roomsync.redis.cache.windows.net",
      port: 6380,
      password: "LQPm0YjVZf7DRLwNAUGOswPrnDZ4Y3DhCAzCaBGngHs=",
      tls: {
        servername: "roomsync.redis.cache.windows.net",
        rejectUnauthorized: false, // Adjust this based on your SSL/TLS requirements
      },
    }),
  },
  initializeGameServer: roomHandler,
  initializeExpress: (app) => {
    app.get("/health", (req, res) => {
      res.status(200).json({ status: "RUNNING" });
    });

    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }
    app.use("/monitor", monitor());
    app.use("/getToken", async (req, res) => {
      res.status(200).json(await generateToken());
    });
  },

  beforeListen: () => {
    console.log("Preparing server ...");

    // Create an instance of ioredis for additional debugging and logging
    const ioredis = new Redis({
      host: "roomsync.redis.cache.windows.net",
      port: 6380,
      password: "LQPm0YjVZf7DRLwNAUGOswPrnDZ4Y3DhCAzCaBGngHs=",
      tls: {
        servername: "roomsync.redis.cache.windows.net",
        rejectUnauthorized: false, // Adjust this based on your SSL/TLS requirements
      },
    });

    // Event handlers for additional logging
    ioredis.on("connect", () => {
      console.log("Connected to Redis server");
    });

    ioredis.on("error", (error) => {
      console.error("Redis connection error:", error);
    });

    // ioredis.set("my-new-age-22", "22");
    presence.set("fruit", "apple");
  },
});
