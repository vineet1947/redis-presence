const { roomModel } = require("../models/room.model");

module.exports = {
    roomHandler: (room) => {
        room.define('Hexaverse', roomModel).filterBy(['roomIdentity']);
        room.define('Hexaverse_v2', roomModel).filterBy(['roomIdentity']);
        room.define('Default', roomModel).filterBy(['roomIdentity']);
    }
}