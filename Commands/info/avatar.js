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
        .setTitle('Link As')
        .setDescription(`[png](${Target.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}) | [jpg](${Target.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })}) | [webp](${Target.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })}) `)
        .setImage(Target.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setFooter(`Requerido Por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))

        message.reply({embeds: [responder]})
    }
}
