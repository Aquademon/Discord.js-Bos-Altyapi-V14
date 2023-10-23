const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const fs = require("fs");
const config = require("./config.json");
require("dotenv").config();

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.config = config;
client.prefix = config.PREFIX;

module.exports = client;

fs.readdirSync("./Handlers").forEach((handler) => {
  require(`./Handlers/${handler}`)(client);
});

client.login(process.env.CLIENT_TOKEN);
