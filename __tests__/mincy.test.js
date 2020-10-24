const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('tiny-glob/sync');
const mincyPath = path.resolve('./lib/mincy.js');

function compare(dir, files) {
  const expected = glob('**', {cwd: dir});

  expected.forEach(file => {
    if (file === 'README.md') {
      expect(files[file]).toBe(read(`${dir}/${file}`).trim());
    }
  });
}

function read(file) {
  return fs.readFileSync(file, 'utf-8');
}

function exec(cmd) {
  return new Promise((fulfil, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      fulfil();
    });
  });
}

describe('mincy', () => {
  it('allows flags wherever', async () => {
    await exec(`node ${mincyPath} create rajikaimal/mincy-test /tmp/mincy`);
    compare(`/tmp/mincy`, {
      'README.md': '# mincy-test',
    });
  }, 12000);
});
