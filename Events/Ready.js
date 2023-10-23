const { ActivityType } = require("discord.js");
const client = require("..");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const chalk = require("chalk");

client.on("ready", async () => {
  if (!MONGODB_URI) return;

  await mongoose.connect(MONGODB_URI || "", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (mongoose.connect) {
    console.log(
      chalk.greenBright(`[MONGODB DRIVER]`),
      chalk.white("The database is running.")
    );
  }
  const activities = [
    {
      name: `Discord.js V14`,
      url: "https://twitch.tv/discord",
      type: ActivityType.Streaming,
    },
    {
      name: `by AquaDemon`,
      url: "https://twitch.tv/discord",
      type: ActivityType.Streaming,
    },
  ];
  const status = ["online", "dnd", "idle"];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0;
    client.user.setStatus(status[s]);
    s++;
  }, 30000);
  console.log(chalk.red(`Logged in as ${client.user.tag}!`));
});
