const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "Fornece informações sobre o bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let dono = "329614299557396483"; // Coloque seu ID
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "JavaScript";
    let livraria = "Discord.Js";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: bot, iconURL: avatar_bot })
      .setFooter({ text: bot, iconURL: avatar_bot })
      .setTimestamp(new Date())
      .setThumbnail(avatar_bot)
      .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n> 🤖 Nome: \`${bot}\`.\n> 🤖 Dono: matrizzyt#8989.
\n> ⚙ Membros: \`${membros}\`.\n> ⚙ Servidores: \`${servidores}\`.\n> ⚙ Canais: \`${canais}\`.\n> ⚙ Ping: \`${ping}\`.
\n> 📚 Linguagem de programação: \`${linguagem}\`.\n> 📚 Library: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}