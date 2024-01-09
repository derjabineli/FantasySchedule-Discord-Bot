import { Client, IntentsBitField } from "discord.js";
import "dotenv/config";
import getTodaysGames from "../api/getGameSchedule.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(process.env.TOKEN);

async function playingTeams() {
  const games = await getTodaysGames();
  let message = "";
  games.forEach((game) => (message += `${game.name} \n`));
  // console.log(message);
  return message;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.content === "/games") {
    async function send() {
      const message = await playingTeams();
      msg.reply("## Today's Games :basketball:\n" + message);
    }
    send();
  }
});
