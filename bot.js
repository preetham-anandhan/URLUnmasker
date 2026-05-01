const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`🤖 Bot logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Command: !domain google.com
  if (message.content.startsWith("!domain")) {
    const domain = message.content.split(" ")[1];

    if (!domain) {
      return message.reply("❌ Please provide a domain");
    }

    try {
      message.reply("🔍 Fetching domain info...");

      const res = await axios.get(
        `https://urlunmasker.onrender.com/api/domain/${domain}`
      );

      const data = res.data;

      const reply = `
🌐 Domain: ${data.domain}
📡 IP: ${data.ip}
🏢 Owner: ${data.owner}
🏛️ Registrar: ${data.registrar}
📍 Location: ${data.city}, ${data.country}
📶 ISP: ${data.isp}
      `;

      message.reply(reply);

    } catch (error) {
      console.error(error.message);
      message.reply("❌ Failed to fetch data");
    }
  }
});
console.log("TOKEN:", process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);