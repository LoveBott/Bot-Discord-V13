const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "setnick",
  description: "Establece un apodo para el usuario",
  permission: "MANAGE_NICKNAMES",
  options: [
    {
      name: "usuario",
      description: "Menciona al usuario para el setnick",
      type: 6,
      required: true,
    },
    {
      name: "setapodo",
      description: "Pon un texto para cambiarle el apodo al user",
      type: 3,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (interaction, client) => {
    try {
      const user = interaction.options.getUser("usuario");
      const nickname = interaction.options.getString("setapodo");

      const embed = new MessageEmbed().setColor("RANDOM");

      if (!user.member.manageable && user.member.id === client.user.id) {
        embed.setDescription(
          `No puedo cambiar el apodo de ${user.member.toString()}`
        );
        return interaction.followUp({ embeds: [embed] });
      }

      const oldNick = user.member.nickname
        ? user.member.nickname
        : user.member.user.username;

      await user.member.setNickname(nickname);

      embed
        .setDescription(
          `:white_check_mark: ${user.member.toString()}'s Nick Cambiado`
        )
        .setFooter(`De ${oldNick} a ${nickname}`);
      await interaction.followUp({ embeds: [embed] });
    } catch (err) {
      console.log("Algo salió mal En La Consola =>", err);
    }
  },
};
