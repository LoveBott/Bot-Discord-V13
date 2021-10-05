const { Events } = require("../Validation/EventNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");


module.exports = (client, Discord) => {
    var Table = new Ascii("Eventos Cargados")

    await (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
         const event = require(file);
 
         if(!Events.includes(event.name) || !event.name) {
             const L = file.split("/")
             await Table.addRow(`${event.name || "MISSING"}`, `📛 El nombre del evento no es válido o falta: ${L[5] + `/` + L[6]}`)
             return;
         }
 
         
         if(event.once) {
             client.once(event.name, (...args) => event.run(...args, client))
         } else {
             client.on(event.name, (...args) => event.run(...args, client))
         };
 
         await Table.addRow(event.name, "✔ EXITOSO")
     });
 
     console.log(Table.toString());
 
};
