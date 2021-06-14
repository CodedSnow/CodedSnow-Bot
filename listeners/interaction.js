const { botCache } = require('../structures/cache')
const config = require('../config')

module.exports = async function (client, interaction) {
    if (interaction.isCommand() && botCache.commands.has(interaction.commandName)) {
        botCache.commands.get(interaction.commandName).exec(client, interaction)
    } else if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON') {
        // ============ Verification Part ============
        if (interaction.customID === 'verify:addRole') {
            if (!interaction.member.roles.cache.has(config.roles.verification))  {
                interaction.member.roles.add(config.roles.verification)
            }
            interaction.deferUpdate()
        }

    }
}