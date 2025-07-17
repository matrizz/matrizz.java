require('../index')
const client = require('../index')

const monitoredUsers = ['900204670142791756', '438131208522694676']

client.on('ready', async () => {
    console.log(`🔥 Estou online em ${client.user.username}!`)
})