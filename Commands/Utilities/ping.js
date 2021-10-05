const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong"],
  permissions: "MANAGE_CHANNELS",
  description: "Pong!",
  cooldown: 5,
  ///**
  // *
  // * @param {import("../../index")} client
  // * @param {import("discord.js").Message} message
  // * @param {String[]} args
  // */
  run: async (client, message, args) => {
    
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Mi Ping Es: ${client.ws.ping}ms 🏓`);
     message.reply({ embeds: [embed] });
    
  },
};
