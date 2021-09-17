const client = require('../../index');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        let cmd = client.slash_commands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({
            content: 'este comando Slash no existe Consulte al server de soporte si sale de nuevo este mensaje'
        }) && client.slash_commands.delete(interaction.commandName)

        await interaction.deferReply().catch(e => { });
        let options = interaction.options._hoistedOptions;

        cmd.run(client, interaction, options)
    }
})
