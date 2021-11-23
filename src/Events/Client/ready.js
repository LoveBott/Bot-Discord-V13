const { Client, MessageEmbed } = require("discord.js");
const { ownerTag } = require("../../Strutures/config.json");
const mongoose = require("mongoose");
const AsciiTable = require("ascii-table");

module.exports = {
	name: "ready",
	once: true,
	/**
	 * @param {Client} client
	 */
	run: async (client) => {
		var Table = new AsciiTable("Client");
		Table.setHeading("Name", "Connect?", "Ping").addRow(`${client.user.username}`, `✔ Yes`, `${client.ws.ping}MS`);

		console.log(Table.toString());

		const listoo = new MessageEmbed()
			.setDescription(
				`**El Client \`${client.user.tag}\` ||${client.user.id}|| Esta Listo!\nPing: ${client.ws.ping}MS\nUptime: <t:${parseInt(
					client.readyTimestamp / 1000
				)}:R>**`
			)
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(
				`Estoy En ${client.guilds.cache.size} Servers Con ${client.users.cache.size} Y ${client.channels.cache.size} Canales En Total | Owner: ${ownerTag}`
			);
		client.user.setActivity("Mensaje :D", { type: "PLAYING" }); // TYPES: PLAYING, WATCHING, COMPETING, LISTENING, STREAMING
		//Para el Tipo STREAMING es: client.user.setActivity("En Vivo", { type: "STREAMING", url: "Twitch URL" })

		client.channels.cache.get(process.env.CHANNEL_READY).send({ embeds: [listoo] }); //.env + process.env.CHANNEL_READY + CHANNEL_READY = CHANNEL_ID  | ejemplo: CHANNEL_READY=CHANNEL_ID :)!
		if (!MongooseURL) return;
		mongoose
			.connect(process.env.MONGO_URL, {
				//.env + process.env.MONGO_URL + MONGO_URL = TU_MONGO_URL  | ejemplo: MONGO_URL=TU_MONGO_URL :)!
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				var Table = new AsciiTable("Mongoose");

				Table.setHeading("Conectado?").addRow("✔ Yes");

				console.log(Table.toString());
			})
			.catch(() => {
				var Table = new AsciiTable("Mongoose");

				Table.setHeading("Conectado?").addRow(`✖ ${err}`);

				console.log(Table.toString());
			});
	},
};
