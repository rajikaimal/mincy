const degit = require("degit");
const child_process_npm = require("child_process");

function npmInstall(path: string) {
  child_process_npm.execSync("npm install", { cwd: path, stdio: [0, 1, 2] });
}

function create(url: string, destination: string) {
  console.log(`creating ${url} ${destination}`);
  const dest = destination !== null ? destination : __dirname;

  if (url !== null) {
    const emitter = degit(url, {
      cache: false,
      force: true,
      verbose: false,
    });

    emitter.on("info", (info: any) => {
      console.log(info.message);
    });

    emitter
      .clone(dest)
      .then(() => {
        console.log("template created");
        console.log("installing dependencies ...");
        npmInstall(dest);
      })
      .catch((err: string) => {
        console.log("error cloning", err);
      });
  }
}

module.exports = create;
