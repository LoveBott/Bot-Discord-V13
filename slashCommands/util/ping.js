module.exports = {
    name: 'ping',
    description: 'mira el ping',
    run: async (client, interacion, options) => {
        await interacion.followUp('Ping is' + client.ws.ping )
    }
}