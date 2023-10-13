const { createClient } = require("redis");
const { RedisPresence, Room, Server } = require("colyseus");
var client = require("../../connection-helper");
const azureRedis = require("azure-redis");

const {
  redisHost,
  redisPort,
  redisPassword,
  port,
} = require("./src/config/service.config"); // moving creds here -- testing ..

const presence = new RedisPresence({
  options: {
    host: "roomsync.redis.cache.windows.net",
    port: 6380,
  },
});

async function createRoom() {
  const client = await createClient({
    url: "roomsync.redis.cache.windows.net:6380,password=LQPm0YjVZf7DRLwNAUGOswPrnDZ4Y3DhCAzCaBGngHs=,ssl=True,abortConnect=False",
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  console.log("new config set success !! ");
  await client.set("key", "value");
  const value = await client.get("key");
  console.log("response brfor : ", value);
  client.set("foo", "bar");
  console.log("Response redis  : ", client.get("foo"));
  await client.disconnect();
}

createRoom();

// create redis conncetion
// redis - client

// console.log("redis hoist ", redisHost);

// // redis connect
// async function testCache() {
//   // Connection configuration
//   const cacheConnection = redis.createClient({
//     // rediss for TLS
//     url: `rediss://${redisHost}:${redisPort}`,
//     password: redisPassword,
//   });

//   // Connect to Redis
//   await cacheConnection.connect();

//   // PING command
//   console.log("\nCache command: PING");
//   console.log("Cache response : " + (await cacheConnection.ping()));

//   // SET
//   console.log("\nCache command: SET Message");
//   console.log(
//     "Cache response : " +
//       (await cacheConnection.set(
//         "my-message",
//         "Hello vineet! The cache is working from Node.js!"
//       ))
//   );
//   console.log(cacheConnection.get("Message"));

//   await cacheConnection.set("my-name", "vineet");
//   cacheConnection.disconnect();
//   return "done";
// }

// testCache()
//   .then((result) => console.log(result))
//   .catch((ex) => console.log(ex));

// indx .js more configs

// console.log("server app : ", app);
// const serverOptions = {
//   presence: new RedisPresence({
//     host: redisHost,
//     port: redisPort || 6379,
//     password: redisPassword,
//   }),
// };

// const port = process.env.COLYSEUS_PORT
//   ? Number(process.env.COLYSEUS_PORT)
//   : 2567;
// console.log("new-port ", port);

// const gameServer = new Server(serverOptions);
// // gameServer.define("testroom", TestRoom);
// app.listen(port);
