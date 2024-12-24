module.exports = {
    name: ['//ping'],  // Nome principal do comando
    description: 'Retorna a latência do bot',
    execute(message) {
        if (message.author.bot) return;

        const ping = Date.now() - message.createdTimestamp;
        const apiPing = Math.round(message.client.ws.ping);

        message.reply({
            embeds: [
                {
                    title: '🏓 Pong!',
                    fields: [
                        { name: 'Latência', value: `${ping}ms`, inline: true },
                        { name: 'Latência da API', value: `${apiPing}ms`, inline: true },
                    ],
                    color: 0x00ff00,
                },
            ],
        });

    },
};
