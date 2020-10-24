const degit = require("degit");
const child_process_npm = require("child_process");

function npmInstall(path: string) {
  child_process_npm.execSync("npm install", { cwd: path, stdio: [0, 1, 2] });
}

function create(url: string, destination: string) {
  console.log(`Creating ${url} ${destination}`);
  const dest = destination !== null ? destination : __dirname;

  if (url !== null) {
    const emitter = degit(url, {
      cache: true,
      force: true,
      verbose: true,
    });

    emitter.on("info", (info: any) => {
      console.log(info.message);
    });

    emitter
      .clone(dest)
      .then(() => {
        console.log("Template created");
        console.log("Installing dependencies ...");
        npmInstall(dest);
      })
      .catch((err: string) => {
        console.log("Error cloning");
      });
  }
}

module.exports = create;
