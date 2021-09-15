const { Client, Interaction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "obtiene un avatar",
    type: 'CHAT_INPUT',
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
   * @param {Interaction} interaction
   */
    run: async (client, interacion, options) => {
            try {
              const options = interacion.options._hoistedOptions;
        
        
              const user = (options.find((e) => e.name === "user") && options.find((e) => e.name === "user").member.user) || interacion.user;
              const member = (options.find((e) => e.name === "user") && options.find((e) => e.name === "user").member) || interacion.member;
        
              const embed = new MessageEmbed().setColor(member.displayHexColor);
        
              const image = user.displayAvatarURL({dynamic: true, size: 4096});
        
        
              embed.setAuthor(member.displayName, user.displayAvatarURL()).setImage(image).setTimestamp();
              await interacion.followUp({embeds: [embed]})
            } catch (err) {
              console.log("Algo salió mal =>",err);
            }
          },
    }