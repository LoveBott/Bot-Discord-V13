const {
  Client,
  MessageEmbed,
  Client,
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "obtiene un avatar",
  //permission: "SEND_MESSAGES"
  options: [
    {
      name: "user",
      description: "User Avatar",
      type: 6,
      required: false,
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
      const user = interaction.options.getUser("user") || interaction.user;

      const member =
        interaction.options.getMember("user") || interaction.member;

      const embed = new MessageEmbed().setColor("RANDOM");

      const image = user.displayAvatarURL({ dynamic: true, size: 1024 });

      const png = user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 1024,
      });

      const jpg = user.displayAvatarURL({
        dynamic: true,
        format: "jpg",
        size: 1024,
      });

      const webp = user.displayAvatarURL({
        dynamic: true,
        format: "webp",
        size: 1024,
      });

      const jpeg = user.displayAvatarURL({
        dynamic: true,
        format: "jpeg",
        size: 1024,
      });

      const gif = user.displayAvatarURL({
        dynamic: true,
        format: "gif",
        size: 1024,
      });

      embed.setAuthor(`Avatar De ${member.displayName}'s`);
      embed.setImage(image);
      embed.setTitle("Links As");
      embed.setDescription(
        `[png](${png}) | [jpg](${jpg}) | [webp](${webp}) | [jpeg](${jpeg}) | [gif](${gif}) `
      );

      const row = new MessageActionRow().addComponents(
        new MessageButton().setStyle("LINK").setLabel("PNG").setURL(`${png}`),
        new MessageButton().setStyle("LINK").setLabel("JPG").setURL(`${jpg}`),
        new MessageButton().setStyle("LINK").setLabel("WEBP").setURL(`${webp}`),
        new MessageButton().setStyle("LINK").setLabel("JPEG").setURL(`${jpeg}`),
        new MessageButton().setStyle("LINK").setLabel("GIF").setURL(`${gif}`)
      );

      await interaction.followUp({ embeds: [embed], components: [row] });
    } catch (err) {
      let embed2 = new MessageEmbed()
        .setAuthor("❌ Algo Salio Mal")
        .setTitle("Mensaje Del Error =>")
        .setDescription(`**\`\`\`${err}\`\`\`**`);
      return interaction.followUp({ embeds: [embed2] });
    }
  },
}; //Bueno todo es mio pero se bugeo github asi que n.n
