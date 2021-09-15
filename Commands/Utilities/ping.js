const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ['pong'],
    permissions: 'MANAGE_CHANNELS',
    description: "Pong!",
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const embed = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setDescription(`Pong: ${client.ws.ping}ms`)
        message.reply({embeds: [embed]})
    }
}