const { Client, ContextMenuInteraction } = require("discord.js");

module.exports = {
  name: "getContent",
  type: "MESSAGE",
  //permission: "SEND_MESSAGES",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   */
  run: async (interaction, client) => {
      const message = await interaction.channel.messages.fetch(
          interaction.targetId
      )

      interaction.followUp({
          content: `${interaction.user.tag}: ${message.content}`
      })
  },
};
