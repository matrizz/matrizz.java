const client = require('../index')

const monitoredUsers = ['900204670142791756', '438131208522694676']

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (!monitoredUsers.includes(newState.id)) return

    if (!oldState.mute && newState.mute) {
        try {
            await newState.setMute(false)
        } catch (err) {
            console.error(`Erro ao remover mute de ${newState.member.user.tag}:`, err)
        }
    } else if (!oldState.deaf && newState.deaf) {
        try {
            await newState.setDeaf(false)
        } catch (err) {
            console.error(`Erro ao remover deaf de ${newState.member.user.tag}:`, err)
        }

    }
})
