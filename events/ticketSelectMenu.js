require('../index')

const Discord = require('discord.js')
const client = require('../index')

const db = require("../lib/utils/db") // npm i quick.db better-sqlite3

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1022660430394572860" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 1.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            ch.send({ embeds: [embed], components: [botao] }).then(m => {
              m.pin()
            })
          })
        }

      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1022660430394572860" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 2.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            ch.send({ embeds: [embed], components: [botao] }).then(m => {
              m.pin()
            })
          })
        }

      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1022660430394572860" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 3.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            ch.send({ embeds: [embed], components: [botao] }).then(m => {
              m.pin()
            })
          })
        }

      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
      setTimeout(() => {
        try {
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)
    }
  }
})