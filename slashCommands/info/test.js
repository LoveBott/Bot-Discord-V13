const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'test',
    description: 'test',
    run: async (client, interacion, options) => {

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('djs')
            .setLabel('discord.js')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('2')
            .setLabel('xdd.js')
            .setStyle('SECONDARY')
        )
        const embed = new MessageEmbed()
        .setAuthor('iwi')

        await interacion.followUp({embeds: [embed], components: [row]})
    }
}