const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  run: async (interaction, client) => {
    // Handler Slash Commands
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});

      const cmd = client.Slashcommands.get(interaction.commandName);
      if (!cmd)
        return interaction.followUp({ content: "Ups Ocurrio Un Error" });

      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      );

      cmd.run(interaction, client, args);
    }

    // Handler Context Menu xD
    if (interaction.isContextMenu()) {
      await interaction.deferReply({ ephemeral: true });
      const command = client.Slashcommands.get(interaction.commandName);
      if (command) command.run(interaction, client);
    }
  },
};
