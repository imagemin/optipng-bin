import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import execa from 'execa';
import tempy from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import optipng from '../index.js';

test('rebuild the optipng binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = tempy.directory();
	const source = fileURLToPath(new URL('../vendor/source/optipng.tar.gz', import.meta.url));

	await binBuild.file(source, [
		`./configure --with-system-zlib --prefix="${temporary}" --bindir="${temporary}"`,
		'make install',
	]);

	t.true(fs.existsSync(path.join(temporary, 'optipng')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(optipng, ['--version']));
});

test('minify a PNG', async t => {
	const temporary = tempy.directory();
	const sourcePath = fileURLToPath(new URL('./fixtures/test.png', import.meta.url));
	const destinationPath = path.join(temporary, 'test.png');
	const arguments_ = [
		'-strip',
		'all',
		'-clobber',
		'-out',
		destinationPath,
		sourcePath,
	];

	await execa(optipng, arguments_);
	const result = await compareSize(sourcePath, destinationPath);

	t.true(result[destinationPath] < result[sourcePath]);
});
