const { AttachmentBuilder } = require('../bot.js')
const agents = require('../agents/index.js');

module.exports = {
    name: ['//role', '//function'],
    description: 'Retorna uma role aleatória do Valorant',
    execute(message) {
        if (message.author.bot) return;


        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        const roleImage = new AttachmentBuilder(`./${String(randomAgent.roleIcon).toLowerCase()}`);

        message.channel.send({
            files: [roleImage],
            embeds: [
                {
                    fields: [
                        { name: 'Class', inline: true, value: randomAgent.class },
                        { name: 'Role', inline: true, value: randomAgent.role }
                    ],
                    thumbnail: { url: `attachment://${String(randomAgent.role).toLowerCase()}.jpg` },
                    color: 0x0099ff,
                },
            ],
        });
    },
};

