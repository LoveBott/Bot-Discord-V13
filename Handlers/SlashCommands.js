const { Perms } = require('../Validation/Permissions')
const { promisify } = require('util')
const { glob } = require('glob');
const { Client } = require('discord.js');
const PG = promisify(glob);
const Ascii = require('ascii-table')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii('SlashCommands')


    const CommandsArray = [];


    (await PG(`${process.cwd()}/SlashCommands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "🔸 FAILED", "Falta un nombre")

        if(!command.description) 
        return Table.addRow(command.name, "🔸 FAILED", "Falta una Descripcion")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "🔸 FAILED", "Permiso Invalido")
        }

        client.Slashcommands.set(command.name, command)
        CommandsArray.push(command);

        await Table.addRow(command.name, "🔹 EXITOSO")
    });

    console.log(Table.toString())

    client.on("ready", async () => {
        const MailGuild = await client.guilds.cache.get('890703786358759506') //Muy Pronto Si Tiene Apoyo Pongo hacerlo lo mismo pero global osea "await client.application.commands.set(CommandsArray)"

        MailGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return MailGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms))
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, [])

                return [...accumulator, { id: r.id, permissions }]
            }, [])

            await MailGuild.commands.permissions.set({  fullPermissions })
        })
    })

}

