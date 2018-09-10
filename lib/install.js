'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(err => {
	if (err) {
		log.warn(err.message);
		log.warn('optipng pre-build test failed');
		log.info('compiling from source');

		binBuild.url('https://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.6/optipng-0.7.6.tar.gz', [
			`./configure --with-system-zlib --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install'
		])
			.then(err => {
				if (err) {
					log.error(err.stack);
					return;
				}

				log.success('optipng built successfully');
			})
			// eslint-disable-next-line unicorn/catch-error-name
			.catch(error => {
				log.error(error.stack);

				// eslint-disable-next-line unicorn/no-process-exit
				process.exit(1);
			});

		return;
	}

	log.success('optipng pre-build test passed successfully');
});
