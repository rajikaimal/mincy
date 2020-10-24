const child_process_build = require("child_process");

function build() {
  child_process_build.execSync("npm run build", { stdio: [0, 1, 2] });
}

module.exports = build;
