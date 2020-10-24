const child_process = require('child_process');
const mincyPath = require('../lib/index.js');

function exec(cmd) {
  return new Promise((fulfil, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      console.log(stdout);
      console.error(stderr);
      fulfil();
    });
  });
}

function compare(dir, files) {
  const expected = glob('**', {cwd: dir});
  assert.deepEqual(Object.keys(files).sort(), expected.sort());

  expected.forEach(file => {
    if (!fs.lstatSync(`${dir}/${file}`).isDirectory()) {
      assert.equal(files[file].trim(), read(`${dir}/${file}`).trim());
    }
  });
}

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(
      `node ${path.resolve('./index')} ${args.join(' ')}`,
      {cwd},
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      },
    );
  });
}

describe('mincy', () => {
  it('allows flags wherever', async () => {
    let result = await cli(
      ['create', 'create sveltejs/template'],
      '/Users/rajika.imal/Documents/projects/sveltej',
    );
    expect(result.code).toBe(0);
  });
});
