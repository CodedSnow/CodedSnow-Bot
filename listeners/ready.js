const { promises } = require('fs')
const { botCache } = require('../structures/cache')
const config = require('../config')

module.exports = async function (client) {
    await client.user.setActivity('with snowflakes', { type: 'PLAYING' })
    await registerCommands(client)

    console.log('Fully started.')
}

async function registerCommands(client) {
    if (client.application.owner == null) {
        await client.application.fetch()
    }

    (await promises.readdir('./commands')).forEach(file => require(`../commands/${file}`))

    const list = []
    for (let [key, value] of botCache.commands) {
        const data = {
            name: key,
            description: value.desc
        }
        if (value.options != null) data.options = value.options

        list.push(data)
    }

    if (config.devBuild) await client.guilds.cache.get(config.devGuild)?.commands.set(list)
    else await client.application?.commands.set(list)
}

module.exports.once = true