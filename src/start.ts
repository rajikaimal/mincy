const child_process_start = require("child_process");

function start() {
  child_process_start.execSync("npm run start", { stdio: [0, 1, 2] });
}

module.exports = start;
