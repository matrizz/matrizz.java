const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} está online!`);
});

client.login(process.env.DISCORD_TOKEN);

module.exports = { client, AttachmentBuilder };