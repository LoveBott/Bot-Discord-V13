const { MessageButton, MessageActionRow, MessageEmbed, Interaction } = require('discord.js')

module.exports = {
    name: 'say',
    description: 'say',
    type: "CHAT_INPUT",
    options: [
        {
            name: "texto",
            description: "Repite tu mensaje uwu",
            type: 3,
            required: true
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interacion 
     */
    run: async (client, interacion, options) => {

        try {
            await interacion.deferReply().catch((err) => {});
            const say = interacion.options._hoistedOptions.find((f) => f.name === "texto").value;

            await interacion.editReply({content: "Enviando..." })
            await interacion.deleteReply();

            await interacion.channel.send({ content: say });
        } catch (err) {
            console.log('Hubo un erro =>', err)
        }
    }
}