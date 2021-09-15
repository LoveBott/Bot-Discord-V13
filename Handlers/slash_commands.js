const chalk = require('chalk');
const fs = require('fs')
const {
    commands
} = require('../index');
const {
    readdirSync
} = fs;
const client = require('../index')

module.exports = (client, Discord) => {
    
module.exports = (client, Discord)
console.log(chalk.blue.bold('Comandos Slash :D'))
readdirSync('./slashCommands').forEach(async (dir) => {
    const commands = readdirSync(`./slashCommands/${dir}`).filter((file) => 
    file.endsWith('.js')
    )



        commands.map(async cmd => {
            let file = require(`../slashCommands/${dir}/${cmd}`);

            let name = file.name || "No Hay nombre de comando";
            let description = file.description || "No hay description";
            let options = file.options || [];

            const data = {
                name,
                description,
                options
            }

            let option = name == "Hay un nombre en el slash" ? '❌' : '✅';

            console.log(`Slash Command Cargado: ${option} | ${name}`);

            if (option == '✅') {
                setTimeout(async () => {
                    client.slash_commands.set(name, {
                        ...data,
                        run: file.run
                    });

                    await client.guilds.cache.get('ID GUILD').commands.create(data)
                }, 2500);

                
            }
        })
})
}