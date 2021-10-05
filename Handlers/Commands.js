const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Comandos Cargados");
table.setHeading("Comando", "Estado De Carga");

module.exports = (client) => {
  readdirSync("./Commands/").forEach((dir) => {
    const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../Commands/${dir}/${file}`);
      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, "🔹 EXITOSO");
      } else {
        table
          .addRow(
            file,
            "🔸 FAILED",
            "Falta un help.name o help.description no es una cadena."
          )
          .setHeading("Comando", "Estado De Carga", "Error");
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
    }
  });
  console.log(table.toString());
};
