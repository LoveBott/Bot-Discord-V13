const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "mira el ping del bot",
  //permission: "SEND_MESSAGES",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (interaction, client) => {
    await interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setDescription(`Mi Ping Es ${client.ws.ping}`)
          .setColor("RANDOM"),
      ],
    });
  },
};
