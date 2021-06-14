const { botCache } = require('../structures/cache')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const config = require('../config')

botCache.commands.set('donate', {
    desc: 'Obtain general information about donating',
    exec: async function (client, interaction) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setURL('https://github.com/jerskisnow/Suggestions/wiki/Donating')
                .setLabel('Donate')
                .setEmoji('💰')
                .setStyle('LINK')
        )

        const embed = new MessageEmbed()
        embed.setColor(config.embedColor.b)
        embed.setTitle('CodedSnow - Donating')
        embed.setDescription("We greatly appreciated donations but please keep in mind that it isn't required! \
        Therefore only donate what you can miss!\n\nFor more information on donations and the perks that you can receive please use the button below.")

        await interaction.reply({ embeds: [embed], components: [row] })
    }
})