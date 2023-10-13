const { listen } = require("@colyseus/tools");

const app = require("./src/app.config");
listen(app);
