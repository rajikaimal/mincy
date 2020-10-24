const child_process = require("child_process");

function run() {
  child_process.execSync("npm run dev", { stdio: [0, 1, 2] });
}

module.exports = run;
