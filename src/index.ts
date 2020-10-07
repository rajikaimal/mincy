#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const createApp = require("./create");

clear();
console.log(chalk.red(figlet.textSync("mincy", { horizontalLayout: "full" })));

program
  .version("0.0.1")
  .description("Svelte CLI")
  .command("create <cmd> [url] [destination]")
  .description("Create Svelte app")
  .action((cmd: string, url: string, destination: string) => {
    createApp(cmd, url, destination);
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
