'use strict';
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('optipng pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('optipng pre-build test failed');
	log.info('compiling from source');

	// From https://sourceforge.net/projects/optipng/files/OptiPNG/
	binBuild.file(path.resolve(__dirname, '../vendor/source/optipng.tar.gz'), [
		`./configure --with-system-zlib --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		'make install'
	]).then(() => {
		log.success('optipng built successfully');
	}).catch(error => {
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
});
