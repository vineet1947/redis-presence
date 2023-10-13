const express = require('express');
const http = require('http');
const colyseus = require('colyseus');
// const { Server } = require('colyseus');
const { RedisPresence } = require('@colyseus/redis-presence');

const { redisHost, redisPort, redisPassword, port } = require('./src/config/service.config')
const Redis = require('ioredis');
const routes = require('./src/routes/standard.route');

const app = express();
const server = http.createServer(app);

app.get('/', routes);

const presence = new RedisPresence({
    host: redisHost,
    port: redisPort,
    password: redisPassword
});

// const redisClient = new Redis(redisConfig);
// const redisClient = new Redis("redis://roomsync.redis.cache.windows.net:6380,password=8N7ThklOug8pIAbLYltx2DQJNRzcZJa1AAzCaB6yFMM=,ssl=True,abortConnect=False")
const room = new colyseus.Server({
    server,
    presence: presence
});

// const roomModel = require('./src/models/room.model');
// const { openStdin } = require('process');
// const { hostname } = require('os');
// // const { roomHandler } = require("./controllers/room.controller")

// // const room = new roomModel()
// room.define('Hexaverse', roomModel).filterBy(['roomIdentity']);
// room.define('Hexaverse_v2', roomModel).filterBy(['roomIdentity']);
// room.define('Default', roomModel).filterBy(['roomIdentity']);

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});