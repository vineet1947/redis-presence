const redis = require("redis");
const { RedisPresence } = require("@colyseus/redis-presence");
// const RedisPresence = require("@colyseus"); 

const cacheHostName = "roomsync.redis.cache.windows.net";
const cachePassword = "LQPm0YjVZf7DRLwNAUGOswPrnDZ4Y3DhCAzCaBGngHs=";

if (!cacheHostName) throw Error("AZURE_CACHE_FOR_REDIS_HOST_NAME is empty");
if (!cachePassword) throw Error("AZURE_CACHE_FOR_REDIS_ACCESS_KEY is empty");

const presence = new RedisPresence({
  options: {
    host: cacheHostName,
    port: 6380,
    password: cachePassword,
  },
});

async function testCache() {
  // Connection configuration
  const cacheConnection = redis.createClient({
    // rediss for TLS
    url: `rediss://${cacheHostName}:6380`,
    // password: cachePassword,
  });

  // Connect to Redis
  await cacheConnection.connect();
  // PING command
  console.log("\nCache command: PING");
  console.log("Cache response : " + (await cacheConnection.ping()));

  // SET
  console.log("\nCache command: SET Message");
  console.log(
    "Cache response : " +
      cacheConnection.set(
        "test",
        "Hello! The presence cache is working from Node.js!"
      )
  );

  const val = await cacheConnection.get("test");

  console.log("retunrned new-msg : ", val);

  cacheConnection.set("my-age", 55);

  const check = await presence.exists("my-age");
  console.log("presence working : ", check);

  await cacheConnection.disconnect();
  return "done";
}

testCache()
  .then((result) => console.log(result))
  .catch((ex) => console.log(ex));

//   const colyseus = require("colyseus");
// const { RedisPresence } = require("@colyseus/redis-presence");
// const { RedisDriver } = require("@colyseus/redis-driver");

// const gameServer = new colyseus.Server({
//   // ...
//   presence: new colyseus.RedisPresence(),
//   driver: new colyseus.RedisDriver(),
// });

// import "dotenv/config.js";
// const port = process.env.COLYSEUS_PORT
//     ? Number(process.env.COLYSEUS_PORT)
//     : 2567;
// import { RedisPresence, Room, Server } from "colyseus";
// import { MapSchema, Schema, type } from "@colyseus/schema";

// console.log("COLYSEUS_PORT", process.env.COLYSEUS_PORT);
// console.log("REDIS_HOST", process.env.REDIS_HOST);

// const serverOptions = {
//     presence: new RedisPresence({
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
//     }),
// };
