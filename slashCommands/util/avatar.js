const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "obtiene un avatar",
    options: [
        {
            name: 'user',
            description: "User Avatar",
            type: 6,
            required: false
        }
    ],
    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
    run: async (client, interaction, options) => {
            try {
              const options = interaction.options._hoistedOptions;
        
        
              const user = interaction.options.getUser("user") || interaction.user;
              const member = interaction.options.getMember("member") || interaction.member;
        
              const embed = new MessageEmbed().setColor(member.displayHexColor);
        
              const image = user.displayAvatarURL({dynamic: true, size: 4096});
        
        
              embed.setAuthor(member.displayName, user.displayAvatarURL()).setImage(image).setTimestamp();
              await interacion.followUp({embeds: [embed]})
            } catch (err) {
              console.log("Algo salió mal =>",err);
            }
          },
    }
