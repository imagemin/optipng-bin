'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const optipng = require('..');

test('rebuild the optipng binaries', async t => {
	const tmp = tempy.directory();

	await binBuild.url('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.6/optipng-0.7.6.tar.gz', [
		`./configure --with-system-zlib --prefix="${tmp}" --bindir="${tmp}"`,
		'make install'
	]);

	t.true(fs.existsSync(path.join(tmp, 'optipng')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(optipng, ['--version']));
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'-strip',
		'all',
		'-clobber',
		'-out',
		dest,
		src
	];

	await execa(optipng, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
