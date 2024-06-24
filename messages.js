const fs = require('fs');
const axios = require('axios');
const memes = require("random-memes");

async function sendImage(message, imagePath, mentionID) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error(`Local image file ${imagePath} not found.`);
      return;
    }

    const image = fs.readFileSync(imagePath);
    await message.channel.send({
      content: `You mentioned <@${mentionID}>!`,
      files: [{ attachment: image, name: 'image.jpg' }]
    });
  } catch (error) {
    console.error('Error sending local image:', error);
  }
}

function sendRandomResponse(message,filler, type) {
  const randomNumber = Math.floor(Math.random() * 101);
  message.reply(`<@${message.author.id}> ${filler} ${randomNumber}% ${type}`);
}

async function handleRankCommand(message) {
  const args = message.content.split(" ");
  if (args.length < 2 || !args.slice(1).join(" ").includes("#")) {
    message.reply("Please type the command in the format: !rank username#tag");
    return;
  }

  const fullUsername = args.slice(1).join(" ");
  const [username, tag] = fullUsername.split("#");
  if (!username || !tag) {
    message.reply("Invalid format. Please provide your username and tag in the format: !rank username#tag");
    return;
  }

  try {
    const rank = await getValorantRank(username, tag);
    message.reply(`${username}#${tag} is ${rank}`);
  } catch (error) {
    message.reply(`Error fetching rank for ${username}#${tag}: ${error.message}`);
  }
}

async function getValorantRank(username, tag) {
  const API_URL = `https://api.kyroskoh.xyz/valorant/v1/mmr/EU/${encodeURIComponent(username)}/${encodeURIComponent(tag)}`;
  const response = await axios.get(API_URL);
  const data = response.data;

  if (response.status !== 200) {
    throw new Error(`Error fetching data: ${response.statusText} - ${data}`);
  }

  return data;
}

async function getMeme() {
    const meme = await memes.reddit({ locale: "en", customSubredditName: "Funnymemes" });
  return meme.image;
}

module.exports = {
  sendImage,
  sendRandomResponse,
  handleRankCommand,
  getValorantRank,
  getMeme
};
