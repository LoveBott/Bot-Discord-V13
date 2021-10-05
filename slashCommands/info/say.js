const {
  MessageButton,
  MessageActionRow,
  MessageEmbed,
  Interaction,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "say",
  description: "say",
  type: "CHAT_INPUT",
  //permission: "SEND_MESSAGES"
  options: [
    {
      name: "texto",
      description: "Repite tu mensaje",
      type: 3,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (interaction, client, args) => {
    try {
      await interaction.deferReply().catch((err) => {});

      const say = interaction.options.getString("texto");

      await interaction.editReply({ content: "Enviando..." });
      await interaction.deleteReply();

      await interaction.channel.send({ content: say });
    } catch (err) {
      console.log("Hubo un error =>", err);
    }
  },
};
