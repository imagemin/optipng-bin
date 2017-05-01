'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const optipng = require('..');

test.cb('rebuild the optipng binaries', t => {
	const tmp = tempy.directory();

	new BinBuild()
		.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.6/optipng-0.7.6.tar.gz')
		.cmd(`./configure --with-system-zlib --prefix="${tmp}" --bindir="${tmp}"`)
		.cmd('make install')
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'optipng')));
			t.end();
		});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(optipng, ['--version']));
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'-strip', 'all',
		'-clobber',
		'-out', dest,
		src
	];

	await execa(optipng, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
