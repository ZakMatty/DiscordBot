require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const {
  sendImage,
  sendRandomResponse,
  handleRankCommand,
  getMeme
} = require('./messages');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.on("ready", cli => {
  console.log(`${cli.user.username} is online!`);
  client.user.setPresence({ activities: [{ type: 3, name: `you, watching me` }] });
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  const mentionID = '373801680917102593';

  if (message.mentions.has(mentionID)) {
    await sendImage(message, './IMG_2243.jpg', mentionID);
  }

  switch (content) {
    case "ping":
      message.reply("Pong!");
      break;
    case "uwucheck":
    case "uwu check":
    case "!uwucheck":
      sendRandomResponse(message, "is feeling","uwu");
      break;
    case "vibecheck":
    case "vibe check":
    case "!vibecheck":
      sendRandomResponse(message, "is vibing at", "");
      break;
    case "!meme":
      message.channel.send("Here's your meme!");
      const img = await getMeme();
      message.channel.send(img);
      break;
    default:
      handleCommands(message, content);
      break;
  }
});

function handleCommands(message, content) {
  if (content.startsWith("stab") && message.mentions.users.size > 0) {
    const mention = message.mentions.users.first();
    if (mention) {
      message.reply(`<@${message.author.id}> stabs <@${mention.id}>`);
    }
  } else if (content.includes("sneak")) {
    message.reply("You know the best place to get sneak is: https://affiliates.sneakenergy.com/s/magsdata");
  } else if (content.startsWith("!rank")) {
    handleRankCommand(message);
  }
}

client.login(process.env.CLIENT_TOKEN);
