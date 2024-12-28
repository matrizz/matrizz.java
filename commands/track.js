const { AttachmentBuilder } = require("../bot");
const fs = require('fs');
const axios = require('axios');

const path = require('path');

module.exports = {
    name: ['//track'],
    description: 'Retorna estatísticas do player',
    async execute(message, playerName, playerTag) {
        if (message.author.bot) return

        const pid = [playerName, playerTag].join('%23')
        const response = await axios.get(`https://matrizz-java-api.vercel.app/api/screenshot?pid=${pid}`, {
            responseType: 'arraybuffer',
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })

        if (response.headers['content-type'].startsWith('image/png')) {

            const arrayBuffer = Buffer.from(response.data);
            const jsonData = JSON.parse(arrayBuffer.toString())
            const uint8Array = new Uint8Array(Object.values(jsonData));

            fs.writeFileSync('./tracker/full_screen_screenshot.png', uint8Array, (err) => {
                if (err) {
                    console.error(err);
                    return message.reply('Erro ao salvar os dados.');
                }
            })
        } else {
            console.log('Resposta não é uma imagem PNG');
        }

        const img = fs.readFileSync('./tracker/full_screen_screenshot.png')
        if (img) {
            const attachment = new AttachmentBuilder('./tracker/full_screen_screenshot.png', { name: `${playerName}.png` })

            message.channel.send({
                files: [attachment],
                embeds: [
                    {
                        title: 'Track',
                        fields: [
                            { name: 'Player', value: `${playerName}`, inline: true },
                            { name: 'Riot identifier', value: `${playerName}#${playerTag}`, inline: true },
                        ],
                        image: { url: `attachment://${playerName}.png` },
                        color: 0x00ff00,
                    },
                ],
            })
        }

    },
};
