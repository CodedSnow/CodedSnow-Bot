const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('../config')

module.exports = async function (client, message) {
    if (message.author.id !== client.application?.owner.id) return

    if (!message.content.startsWith('cs!')) return
    const arr = message.content.split('!')[1].split(' ') // [0 = cmd, 1 = arg, 2 = arg, ...]

    // =====================================
    if (arr[0] === 'createVerificationMessage') {
        if (!arr.length) {
            mesage.reply('Invalid arguments.')
            return
        }
        await message.delete()

        const embed = new MessageEmbed()
            .setColor(config.embedColor.b)
            .setDescription(arr.splice(1).join(' '))

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomID('verify:addRole')
                .setLabel('Verify')
                .setEmoji('🔑')
                .setStyle('PRIMARY')
        )
        
        await message.channel.send({ embeds: [embed], components: [row] })
    }
    // =====================================

}