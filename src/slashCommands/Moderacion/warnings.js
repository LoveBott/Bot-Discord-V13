const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("../../Strutures/Models/warn-model");

module.exports = {
	name: "warn",
	description: "Sistema De Warns",
	options: [
		{
			name: "add",
			description: "Agrega una advertencia",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Seleccione un user",
					type: "USER",
					requiered: true,
				},
				{
					name: "razon",
					description: "Pon Una Razon",
					type: "STRING",
					requiered: true,
				},
				{
					name: "evidencia",
					description: "Proporcionar evidencia",
					type: "STRING",
					requiered: false,
				},
			],
		},
		{
			name: "check",
			description: "Resiva Las Warns Del User",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Seleccione A Un user Para Ver Sus Warns",
					type: "USER",
					requiered: true,
				},
			],
		},
		{
			name: "remove",
			description: "Elimina Una Warn A Un user",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Menciona A Un user",
					type: "USER",
					required: true,
				},
				{
					name: "warnid",
					description: "Seleccione La Id Del Warn Que Tiene El User",
					type: "NUMBER",
					required: true,
				},
			],
		},
		{
			name: "clear",
			description: "Elimina Todas Las Warns A Un user",
			type: "SUB_COMMAND",
			options: [
				{
					name: "user",
					description: "Selecciona A Un user Para Eliminar Las Warns",
					type: "USER",
					required: true,
				},
			],
		},
	],
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	run: async (interaction, client) => {
		const sub = interaction.options.getSubcommand(["add", "check", "remove", "clear"]);
		const user = interaction.options.getMember("user");
		const razon = interaction.options.getString("razon") || "no dijo una razon";
		const evidencia = interaction.options.getString("evidencia") || "no fue proporcionado";
		const warnID = interaction.options.getNumber("warnid") - 1;
		const fechawarn = new Date(interaction.createdTimestamp).toLocaleDateString();

		if (sub === "add") {
			db.findOne(
				{
					GuildID: interaction.guildId,
					UserID: user.id,
					UserTag: user.user.tag,
				},
				async (err, data) => {
					if (err) throw err;
					if (!data) {
						data = new db({
							GuildID: interaction.guildId,
							UserID: user.id,
							UserTag: user.user.tag,
							Content: [
								{
									ExecuterID: interaction.user.id,
									ExecuteTag: interaction.user.tag,
									Reason: razon,
									Evidence: evidencia,
									Date: fechawarn,
								},
							],
						});
					} else {
						const obj = {
							ExecuterID: interaction.user.id,
							ExecuteTag: interaction.user.tag,
							Reason: razon,
							Evidence: evidencia,
							Date: fechawarn,
						};
						data.Content.push(obj);
					}
					data.save();
				}
			);

			interaction.followUp({
				embeds: [
					new MessageEmbed()
						.setAuthor("SISTEMA DE WARNS")
						.setColor("RANDOM")
						.setDescription(`Advertencia agregada: ${user.user.tag} | ||${user.id}||\n**Razon:** ${razon}\n**Evidencia:**\n${evidencia}`),
				],
			});
		} else if (sub === "check") {
			db.findOne(
				{
					GuildID: interaction.guildId,
					UserID: user.id,
					UserTag: user.user.tag,
				},
				async (err, data) => {
					if (err) throw err;
					if (data) {
						return interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setAuthor("SISTEMA DE WARNS")
									.setColor("RANDOM")
									.setDescription(
										`${data.Content.map(
											(w, i) => `**ID**: ${i + 1}\n**Por**: ${w.ExecuteTag}\n**Fecha**: ${w.Date}\n**Razon:**: ${
												w.Reason
											}\nEvidencia: ${w.Evidence}
                \n`
										).join(" ")}`
									),
							],
						});
					} else {
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setTitle("SISTEMA DE WARNS")
									.setColor("RANDOM")
									.setDescription(`${user.user.tag} | ||${user.id}|| no tiene warns.`),
							],
						});
					}
				}
			);
		} else if (sub === "remove") {
			db.findOne(
				{
					GuildID: interaction.guildId,
					UserID: user.id,
					UserTag: user.user.tag,
				},
				async (err, data) => {
					if (err) throw err;
					if (data) {
						data.Content.splice(warnID, 1);
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setTitle("WANRS SISTEMA")
									.setColor("RANDOM")
									.setDescription(`**${user.user.tag} ||${user.id}||** El Warn Id: \`${warnID + 1}\` Fue Removido Del user`),
							],
						});
						data.save();
					} else {
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setTitle("SISTEMA DE WARNS")
									.setColor("RANDOM")
									.setDescription(`${user.user.tag} | ||${user.id}|| no tiene warns.`),
							],
						});
					}
				}
			);
		} else if (sub === "clear") {
			db.findOne(
				{
					GuildID: interaction.guildId,
					UserID: user.id,
					UserTag: user.user.tag,
				},
				async (err, data) => {
					if (err) throw err;
					if (data) {
						await db.findOneAndDelete({
							GuildID: interaction.guildId,
							UserID: user.id,
							UserTag: user.user.tag,
						});
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setTitle("SISTEMA DE WARNS")
									.setColor("RANDOM")
									.setDescription(`${user.user.tag} ||${user.id}|| se le elimino todo el historial de warns`),
							],
						});
					} else {
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setTitle("SISTEMA DE WARNS")
									.setColor("RANDOM")
									.setDescription(`**\`${user.user.tag}\` - ||${user.id}|| no tiene warns.**`),
							],
						});
					}
				}
			);
		}
	},
};
