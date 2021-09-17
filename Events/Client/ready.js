module.exports = {
    name: "ready",
    execute(client) {
        console.log(`${client.user.tag} Esta Listo!`)
        client.user.setActivity('Tu Texto PD: Mensaje Para Poner en el Estado!', {type: 'PLAYING' }) // PLAYING, WATCHING, LISTENING, STREAMING Nota: Para El STREAMING Debes Poner Asi:
        //type: "STREAMING",
        //url: "twitch canal!"
        //osea client.user.setActity("Hola", {type: 'STREAMING', url: 'https://twitch.com/jennifer' }) // Asi OwO
    }
}
