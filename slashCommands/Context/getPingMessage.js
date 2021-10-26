const { Client, ContextMenuInteraction } = require("discord.js");

module.exports = {
  name: "getPingMessage",
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
          content: `Ping Message: ${Date.now() - message.createdTimestamp}`
      })
  },
};
