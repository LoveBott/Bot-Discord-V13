<p align="center">Bot Discord V13 ❤ </p>

# Instalación

**Se requiere Node.JS v16.6.1 o más reciente**

**Primero Es El Package que es este uwu:**

# PACKAGE

```json
{
  "name": "discord-botv13",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "asynckit": "^0.4.0",
    "callsites": "^3.1.0",
    "combined-stream": "^1.0.8",
    "delayed-stream": "^1.0.0",
    "discord-api-types": "^0.22.0",
    "discord.js": "^13.1.0",
    "dot-prop": "^6.0.1",
    "fs": "^0.0.1-security",
    "is-obj": "^2.0.0",
    "lodash.isequal": "^4.5.0",
    "mime-db": "^1.49.0",
    "mime-types": "^2.1.32",
    "node-fetch": "^2.6.1",
    "ow": "^0.27.0",
    "ts-mixer": "^6.0.0",
    "tslib": "^2.3.1",
    "type-fest": "^1.4.0",
    "vali-date": "^1.0.0",
    "ws": "^7.5.3"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}



```

```text
Despues de Esto Pones "npm init -y"
y lo ultimo:
```
```javascript
npm install
```
**Para Instalar Los Npms!**
# Despues Debes Irte Donde el archivo config.json y Pones esto!

  ```javascript
  {
    "token": "Tu Token - Aqui Lo Podes Copiar Tu Token: https://discord.com/developers/applications/clientid/bot",
    "prefix": "Tu Prefix"
  }
  ```

#### Ejemplos

**npm install discord.js Package Aqui: [**Click Aqui**](https://github.com/Jennifer7w7/Bot-Tutoriales-V13#package)- lo definimos abajo esta para hacer el bot 😅**

# DISCORD.JS

```javascript
const Discord = require('discord.js')
const client = new Client({intents: 1}) //Si quieres poner otros intents es aqui: https://ziad87.net/intents/
const { token, prefix } = require('./config.json')

function presence(){
   client.user.setPresence({
      status: "online",
      game: {
         name: "TEXTO", // Mensaje Para Poner en el Estado!
         type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING Nota: Para El STREAMING Debes Poner Asi:
         //type: "STREAMING",
         //url: "twitch canal!" uwu!
      }
   });
}


client.on("ready", () => {
    console.log("Estoy listo!");
    prensece();
 });
 
client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !==0) return;

    const agrs = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = agrs.shift().toLowerCase();

    if(command === 'ping') {

        message.reply("Pong")

    }
   });
 

 
 client.login(token);

```

# ⁉ No Sabes Como Copiar Tu Token? Sencillo Aqui Lo Podes Ver uwu:

<div align="left"><img src="https://github.com/Lovebott/Bot-Discord-V13/blob/main/assets/token-bot-tutoriales.gif?raw=true">

# Mas Informacion: [Click Aqui](https://github.com/Lovebott/Bot-Discord-V13#-ejecuta-el-proyecto-en)
