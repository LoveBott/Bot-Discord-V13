const { Client, Collection } = require("discord.js");
require("dotenv").config(); //Para Que Os Valga Los .env :)! | PD: Si Estas En Replit Lee Abajo Linea 6
// Y Esto Es Para Visual Studio Code O Otro Editor De Codigo Si Su Codigo No lo Acepta Miren
//Si Hay Algo Para Los .env o llamados Secrets Suerte!
const client = new Client({ intents: 1 }); // Para Cambiar A Otros Intents Entra A Esta Pagina Para Escoger Tus Intents: https://ziad87.net/intents/
const { token } = require("./config.json"); //En Replit Cambialo A: const token = process.env("TOKEN") Deben Tener su token en Secrets
//Mas Informacion: https://github.com/LoveBott/Bot-Discord-V13#env-en-replit

client.Slashcommands = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

require("./Handlers/Events")(client);
require("./Handlers/SlashCommands")(client);
require("./Handlers/Commands")(client);

client.login(process.env.TOKEN); //process.env.TOKEN + .env = TOKEN | ejemplo: TOKEN=TU_TOKEN :)!
