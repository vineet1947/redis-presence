require("dotenv/config.js");
const port = process.env.COLYSEUS_PORT
    ? Number(process.env.COLYSEUS_PORT)
    : 2567;
const { RedisPresence, Room, Server } = require("colyseus");
const { MapSchema, Schema, type } = require("@colyseus/schema");

console.log("COLYSEUS_PORT", process.env.COLYSEUS_PORT);
console.log("REDIS_HOST", process.env.REDIS_HOST);

const serverOptions = {
    presence: new RedisPresence({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    }),
};

class Player extends Schema {
    @type("string") sessionId = "";
    @type("number") x = 0;
    @type("number") y = 0;
}

class RoomState extends Schema {
    @type({ map: Player }) players = new MapSchema();
}

class TestRoom extends Room {
    constructor() {
        super();
        this.maxClients = 4;
    }

    onCreate(options) {
        console.log("TestRoom created!", options);
        this.setState(new RoomState());
        this.onMessage("move", this.onMove.bind(this));
    }

    onJoin(client, options) {
        const player = new Player();
        player.sessionId = client.sessionId;
        this.state.players.set(client.sessionId, player);
    }

    onMove(client, coors) {
        console.log("TestRoom received coords from", client.sessionId, ":", coors);
        const player = this.state.players.get(client.sessionId);
        if (player) {
            player.x = coors.x;
            player.y = coors.y;
        }
        // print out all players' coords
        this.state.players.forEach((player) => {
            console.log(player.sessionId, player.x, player.y);
        });
    }
}

const gameServer = new Server(serverOptions);
gameServer.define("testroom", TestRoom);
gameServer.listen(port);
