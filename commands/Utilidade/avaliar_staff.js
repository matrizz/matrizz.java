const Discord = require("discord.js")

module.exports = {
    name: 'avaliar_staff',
    description: 'Avalie um staff do servidor.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'staff',
            description: 'Qual o staff que você deseja avaliar?',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'estrelas',
            description: 'Dê uma nota de 0 a 5 estrelas para o staff escolhido.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'descrição',
            description: 'Descreva sua experiência com o staff escolhido.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        const staffRoleID = '1392383902865428551'
        const channelLogID = '1395224778863935591'
        const staffMember_Verification = interaction.options.getUser('staff')
        const staffMember = interaction.guild.members.cache.get(staffMember_Verification.id)
        const stars = interaction.options.getNumber('estrelas')
        const description = interaction.options.getString('descrição')

        function avaliarStaff(user, estrelas, desc) {
            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setColor('Green')
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`O membro ${interaction.user} ||(${interaction.user.id})|| enviou uma avaliação.`)
                .addFields(
                    {
                        name: `> 💼 Staff`,
                        value: `${user} ||(${user.user.id})||`,
                        inline: false
                    },
                    {
                        name: `> ⭐ Estrelas`,
                        value: `\`${estrelas}/5 Estrelas\``,
                        inline: false
                    },
                    {
                        name: `> 📝 Descrição`,
                        value: `${desc}`,
                        inline: false
                    }
                )
            try {
                interaction.guild.channels.cache.get(channelLogID).send({ embeds: [embed] }).then(() => {
                    interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: `Sucesso, sua avaliação foi enviada!\nDados:\n\`\`\`\n- [💼] Staff: ${user.user.username} ||(${user.user.id})||\n- [⭐] Estrelas: ${estrelas}/5\n- [📝] Descrição: ${desc}\n\`\`\`` })
                })
            } catch (err) {
                interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: `Algo deu errado: \`\`\`\n${err}\n\`\`\`` })
            }
        }

        if (!interaction.guild.roles.cache.get(staffRoleID)) {
            interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: '[❌] Erro: O cargo de staff não existe ou foi configurado incorretamente.' })
        }
        else if (!interaction.guild.channels.cache.get(channelLogID)) {
            interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: '[❌] Erro: O canal de logs não existe ou foi configurado incorretamente.' })
        }
        else if (!staffMember) {
            interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: '[❌] Erro: O usuário mencionado não está no servidor.' })
        }
        else if (!staffMember.roles.cache.get(staffRoleID)) {
            interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: '[❌] Erro: O usuário mencionado não é da staff.' })
        }
        else if (stars < 1 || stars > 5) {
            interaction.reply({ flags: Discord.MessageFlags.Ephemeral, content: '[❌] Erro: Você só pode colocar estrelas de 1 a 5.' })
        }
        else {
            avaliarStaff(staffMember, stars, description)
        }
    }
}