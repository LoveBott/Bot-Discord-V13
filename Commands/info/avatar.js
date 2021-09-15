const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['pfp'],
    description: 'Muestra El Avatar Del Usuario',
    cooldown: 5,
    execute(message, args, commandName, client, Discord) {
        const Target = message.mentions.users.first() || message.author;

        const responder = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${Target.tag}\'s Avatar`)
        .setImage(Target.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`Requerido Por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))

        message.reply({embeds: [responder]})
    }
}