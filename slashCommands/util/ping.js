module.exports = {
  name: "ping",
  description: "mira el ping del bot",
  //permission: "SEND_MESSAGES"
  run: async (interaction, client, args) => {
    await interaction.followUp({ content: `Mi Ping Es: ${client.ws.ping}` });
  },
};
