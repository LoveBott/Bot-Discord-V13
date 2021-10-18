const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong"],
  permissions: "SEND_MESSAGES",
  description: "Pong!",
  cooldown: 5,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Mi Ping Es: ${client.ws.ping}ms 🏓 Pong!`);
    await message.reply({ embeds: [embed] });
  },
};
