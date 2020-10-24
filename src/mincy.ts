#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const createApp = require("./create");
const runApp = require("./run");
const buildApp = require("./build");
const startApp = require("./start");

clear();
console.log(chalk.red(figlet.textSync("mincy", { horizontalLayout: "full" })));

program.version("0.0.1").description("Svelte CLI");

program
  .command("create [url] [destination]")
  .description("Create Svelte app")
  .action((url: string, destination: string) => {
    createApp(url, destination);
  });

program
  .command("run")
  .description("Run svelte app")
  .action(() => {
    runApp();
  });

program
  .command("build")
  .description("Build svelte app")
  .action(() => {
    buildApp();
  });

program
  .command("start")
  .description("Start svelte app")
  .action(() => {
    startApp();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
