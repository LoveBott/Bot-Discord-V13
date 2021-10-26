const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ContextMenuInteraction,
} = require("discord.js");

module.exports = {
  name: "getAvatar",
  type: "USER",
  //permission: "SEND_MESSAGES",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   */
  run: async (interaction, client) => {
    try {
      const user = await interaction.guild.members.fetch(interaction.targetId);

      const embed = new MessageEmbed().setColor("RANDOM");

      const image = user.user.avatarURL({ dynamic: true, size: 1024 });

      const png = user.user.avatarURL({
        dynamic: true,
        format: "png",
        size: 1024,
      });

      const jpg = user.user.avatarURL({
        dynamic: true,
        format: "jpg",
        size: 1024,
      });

      const webp = user.user.avatarURL({
        dynamic: true,
        format: "webp",
        size: 1024,
      });

      const jpeg = user.user.avatarURL({
        dynamic: true,
        format: "jpeg",
        size: 1024,
      });

      const gif = user.user.avatarURL({
        dynamic: true,
        format: "gif",
        size: 1024,
      });

      embed.setAuthor(`Avatar De ${user.user.username}'s`);
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
}; //Context Menu Avatar :)? pwp
