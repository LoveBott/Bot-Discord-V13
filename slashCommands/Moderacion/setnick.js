const {
    MessageEmbed,
    Interaction,
    CommandInteraction,
  } = require("discord.js");
  
  module.exports = {
    name: "setnick",
    description: "Establece un apodo para el usuario",
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
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      try {
        const user = args.find((x) => x.name === "usuario");
        const nickname = args.find((x) => x.name === "setapodo");
  
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
  
        await user.member.setNickname(nickname.value);
  
        embed
          .setDescription(
            `:white_check_mark: ${user.member.toString()}'s Nick Cambiado`
          )
          .setFooter(`De ${oldNick} a ${nickname.value}`);
        await interaction.followUp({ embeds: [embed] });
      } catch (err) {
        console.log("Algo salió mal =>", err);
      }
    },
  };
