const { CommandInteraction, Client, MessageEmbed, MessageSelectMenu } = require("discord.js");
const ms = require("ms");

module.exports = {
	name: "giveaway",
	description: "Un completo sistema de obsequios",
	permissions: "ADMINISTRATOR",
	options: [
		{
			name: "start",
			description: "Inicia Un Sorteo",
			type: "SUB_COMMAND",
			options: [
				{
					name: "duration",
					description: "Proporcione una duración para este sorteo (1m, 1h, 1d)",
					type: "STRING",
					required: true,
				},
				{
					name: "winners",
					description: "Seleccione la cantidad de ganadores para este sorteo",
					type: "INTEGER",
					required: true,
				},
				{
					name: "prize",
					description: "Proporcione el nombre del premio.",
					type: "STRING",
					required: true,
				},
				{
					name: "channel",
					description: "Selecciona un canal al que enviar el sorteo",
					type: "CHANNEL",
					channelTypes: ["GUILD_TEXT"],
				},
			],
		},
		{
			name: "edit",
			description: "Edita Un Mensaje De Un Sorteo!",
			type: "SUB_COMMAND",
			options: [
				{
					name: "message_id",
					description: "Proporcione Un Mensaje ID de un Sorteo Para Editalo",
					type: "STRING",
					required: true,
				},
				{
					name: "addtime",
					description: "Proporcione mas duración para este sorteo (1m, 1h, 1d)",
					type: "STRING",
					required: true,
				},
				{
					name: "winners",
					description: "Seleccione la cantidad de ganadores para este sorteo",
					type: "INTEGER",
					required: true,
				},
				{
					name: "prize",
					description: "Proporcione el nombre del premio.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			name: "acciones",
			description: "Opciones de obsequios",
			type: "SUB_COMMAND",
			options: [
				{
					name: "options",
					description: "Seleccione una opción",
					type: "STRING",
					required: true,
					choices: [
						{
							name: "END",
							value: "end",
						},
						{
							name: "PAUSE",
							value: "pause",
						},
						{
							name: "UNPAUSE",
							value: "unpause",
						},
						{
							name: "REROLL",
							value: "reroll",
						},
						{
							name: "DELETE",
							value: "delete",
						},
					],
				},
				{
					name: "message-id",
					description: "Proporciona el ID del mensaje del sorteo.",
					type: "STRING",
					required: true,
				},
			],
		},
	],
	run: async ({ interaction, client }) => {
		const { options } = interaction;

		const Sub = options.getSubcommand();

		const errorEmbed = new MessageEmbed().setColor("RED");

		const successEmbed = new MessageEmbed().setColor("GREEN");

		switch (Sub) {
			case "start":
				{
					const gchannel = options.getChannel("channel") || interaction.channel;
					const duration = options.getString("duration");
					const winnerCount = options.getInteger("winners");
					const prize = options.getString("prize");

					client.giveawaysManager
						.start(gchannel, {
							duration: ms(duration),
							winnerCount,
							prize,
							messages: {
								giveaway: "🎉 **UN SORTEO COMENZO** 🎉",
								giveawayEnded: "🎉🎉 **SORTEO TERMINADO** 🎉🎉",
								winMessage: "Felicidades, {winners}! Ganaste\ron **{this.prize}**!",
							},
						})
						.then(async () => {
							successEmbed.setDescription("El sorteo se inició con éxito");
							return interaction.followUp({ embeds: [successEmbed] });
						})
						.catch((err) => {
							errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
							return interaction.followUp({ embeds: [errorEmbed] });
						});
				}
				break;

			case "edit":
				{
					const messageId = options.getString("message_id");
					const duration = options.getString("addtime");
					const winnerCount = options.getInteger("winners");
					const prize = options.getString("prize");

					client.giveawaysManager
						.edit(messageId, {
							addTime: ms(duration),
							newWinnerCount: winnerCount,
							newPrize: prize,
						})
						.then(() => {
							successEmbed.setDescription("¡Éxito! ¡Sorteo actualizado!");
							return interaction.followUp({ embeds: [successEmbed] });
						})
						.catch((err) => {
							errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
							return interaction.followUp({ embeds: [errorEmbed] });
						});
				}
				break;

			case "acciones":
				{
					const choise = options.getString("options");
					const messageId = options.getString("message-id");

					const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

					if (!giveaway) {
						errorEmbed.setDescription(`No se pudo encontrar el sorteo con el ID de mensaje: ${messageId} en este server`);
						return interaction.followUp({ embeds: [errorEmbed] });
					}

					switch (choise) {
						case "end":
							{
								client.giveawaysManager
									.end(messageId)
									.then(() => {
										successEmbed.setDescription("El sorteo ha terminado");
										return interaction.followUp({ embeds: [successEmbed] });
									})
									.catch((err) => {
										errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
										return interaction.followUp({ embeds: [errorEmbed] });
									});
							}
							break;

						case "pause":
							{
								client.giveawaysManager
									.pause(messageId)
									.then(() => {
										successEmbed.setDescription("El sorteo se ha detenido ");
										return interaction.followUp({ embeds: [successEmbed] });
									})
									.catch((err) => {
										errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
										return interaction.followUp({ embeds: [errorEmbed] });
									});
							}
							break;

						case "unpause":
							{
								client.giveawaysManager
									.unpause(messageId)
									.then(() => {
										successEmbed.setDescription("Se ha reanudado el sorteo");
										return interaction.followUp({ embeds: [successEmbed] });
									})
									.catch((err) => {
										errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
										return interaction.followUp({ embeds: [errorEmbed] });
									});
							}
							break;

						case "reroll":
							{
								client.giveawaysManager
									.reroll(messageId)
									.then(() => {
										successEmbed.setDescription("Se ha vuelto a lanzar el sorteo");
										return interaction.followUp({ embeds: [successEmbed] });
									})
									.catch((err) => {
										errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
										return interaction.followUp({ embeds: [errorEmbed] });
									});
							}
							break;

						case "delete":
							{
								client.giveawaysManager
									.delete(messageId)
									.then(() => {
										successEmbed.setDescription("El sorteo ha sido eliminado");
										return interaction.followUp({ embeds: [successEmbed] });
									})
									.catch((err) => {
										errorEmbed.setDescription(`Ups A Ocurrido Un Error Al Ejecutar El Comando\n**\`\`\`${err}\`\`\`**`);
										return interaction.followUp({ embeds: [errorEmbed] });
									});
							}
							break;
					}
				}
				break;
		}
	},
};
