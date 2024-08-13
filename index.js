require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const {
  sendImage,
  sendRandomResponse,
  handleRankCommand,
  getMeme,
  sendRandomAgent,
  sendRandomPositiveQuote,
  sendOsrsStats,
  sendVideo
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
  

  if (message.mentions.has(process.env.BEN_USER_ID)) {
    await sendImage(message, './IMG_2243.jpg', process.env.BEN_USER_ID);
  }

  if (message.mentions.has(process.env.MATTY_USER_ID)) {
    await sendVideo(message, './whiff.mp4', process.env.MATTY_USER_ID);
  }

  switch (content) {
    case "ping":
      message.reply("Pong!");
      break;
    case "meow":
      message.reply("Meow");
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
    case "!agent":
    sendRandomAgent(message);
      break;
    case "pma":
      sendRandomPositiveQuote(message);
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
  } else if (content.startsWith("!osrs")) {
    sendOsrsStats(message);
  }
}
client.login(process.env.CLIENT_TOKEN);
