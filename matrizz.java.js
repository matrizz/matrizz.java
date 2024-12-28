require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');

const fs = require('fs')
const path = require('path')
const helpCommands = require('./commands/commands')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} está online!`);
})

const commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(file => {
    if (file !== 'commands.js' && file.endsWith('.js')) {
        const command = require(path.join(commandsPath, file));
        command.name.forEach(name => {
            commands.set(name.toLowerCase(), command);
        });
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return

    if (message.content.toLowerCase() === '//help') {
        message.reply({
            embeds: [
                {
                    title: 'Comandos disponíveis',
                    fields: helpCommands.map(command => ({
                        name: command.name,
                        value: command.description,
                    })),
                    color: 0x0099ff,
                },
            ],
        });
    }

    if (message.content.split(' ').length === 1) {
        const command = commands.get(message.content.toLowerCase());
        command.execute(message);
    } else if (message.content.split(' ').length === 2) {
        const command = commands.get(message.content.toLowerCase().split(' ')[0]);
        const args = message.content.split(' ')[1]
        const [playerName, playerTag] = args.split('#')
        console.log(command, args, playerName, playerTag)
        
        command.execute(message, playerName, playerTag)
    }

});

client.login(process.env.DISCORD_TOKEN)