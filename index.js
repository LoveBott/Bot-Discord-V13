const { Client, Collection } = require('discord.js')
const client = new Client({ intents: 32767 }) // Para Cambiar A Otros Intents Entra A Esta Pagina Para Escoger Tus Intents: https://ziad87.net/intents/
const { token } = require('./config.json')

client.Slashcommands = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

require('./Handlers/Events')(client);
require('./Handlers/SlashCommands')(client);
require('./Handlers/Commands')(client);

client.login(token)