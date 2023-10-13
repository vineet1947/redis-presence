require("dotenv").config();

module.exports = {
  port: process.env.PORT || 2567,
  voipKey: process.env.VOIP_KEY,
  maxParticipants: parseInt(process.env.MAX_PARTICIPANTS) || 100,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
};