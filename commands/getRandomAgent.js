const { AttachmentBuilder } = require('../bot.js')
const agents = require('../agents/index.js')

module.exports = {
    name: ['//agent', '//agente'],
    description: 'Retorna um agente aleatório de Valorant',
    execute(message) {
        if (message.author.bot) return


        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        const agenteImage = new AttachmentBuilder(`./${String(randomAgent.image).toLowerCase()}`);
        const roleImage = new AttachmentBuilder(`./${String(randomAgent.roleIcon).toLowerCase()}`);

        message.channel.send({
            files: [agenteImage, roleImage],
            embeds: [
                {
                    title: `Agent: ${randomAgent.name}`,
                    fields: [
                        { name: 'Class', inline: true, value: randomAgent.class },
                        { name: 'Role', inline: true, value: randomAgent.role }
                    ],
                    image: { url: `attachment://${String(randomAgent.name).toLowerCase()}.png` },
                    thumbnail: { url: `attachment://${String(randomAgent.role).toLowerCase()}.jpg` },
                    color: 0x0099ff,
                },
            ],
        });
    },
}
