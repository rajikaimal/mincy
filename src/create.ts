const degit = require("degit");

function create(url?: string, destination?: string) {
  console.log(`Creating ${url} ${destination}`);

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
      .clone(destination !== null ? destination : __dirname)
      .then(() => {
        console.log("Template created");
      })
      .catch((err: string) => {
        console.log("Error cloning");
      });
  }
}

module.exports = create;
