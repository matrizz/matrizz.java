const Discord = require("discord.js")

module.exports = {
  name: "tickets",
  description: "Ative o sistema de ticket no servidor.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Mencione um canal de texto.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: false,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
      interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
      let canal = interaction.options.getChannel("canal");
      if (!canal) canal = interaction.channel;

      let embed_ephemeral = new Discord.EmbedBuilder()
        .setColor("Grey")
        .setDescription(`Olá ${interaction.user}, o sistema foi adicionado em ${canal} com sucesso.`);

      let emebd_tickets = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> Clique no botão abaixo para abrir um ticket!`);

      let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("tickets_basico")
          .setEmoji("🎫")
          .setStyle(Discord.ButtonStyle.Primary)
      );

      interaction.reply({ embeds: [embed_ephemeral], flags: Discord.MessageFlags.Ephemeral }).then(() => {
        canal.send({ embeds: [emebd_tickets], components: [botao] })
      })
    }



  }
}