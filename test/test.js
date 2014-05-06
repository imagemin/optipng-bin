/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var rm = require('rimraf');

describe('optipng()', function () {
	afterEach(function (cb) {
		rm(path.join(__dirname, 'tmp'), cb);
	});

	beforeEach(function (cb) {
		fs.mkdir(path.join(__dirname, 'tmp'), cb);
	});

	it('should rebuild the optipng binaries', function (cb) {
		var tmp = path.join(__dirname, 'tmp');
		var builder = new BinBuild()
			.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.4/optipng-0.7.4.tar.gz')
			.cfg('./configure --with-system-zlib --prefix="' + tmp + '" --bindir="' + tmp + '"')
			.make('make install');

		builder.build(function (err) {
			assert(!err);
			assert(fs.existsSync(path.join(tmp, 'optipng')));
			cb();
		});
	});

	it('should return path to binary and verify that it is working', function (cb) {
		var binPath = require('../').path;

		binCheck(binPath, '--version', function (err, works) {
			cb(assert.equal(works, true));
		});
	});

	it('should minify a PNG', function (cb) {
		var binPath = require('../').path;
		var args = [
			'-strip', 'all',
			'-clobber',
			'-out', path.join(__dirname, 'tmp/test.png'),
			path.join(__dirname, 'fixtures', 'test.png')
		];

		spawn(binPath, args).on('close', function () {
			var src = fs.statSync(path.join(__dirname, 'fixtures/test.png')).size;
			var dest = fs.statSync(path.join(__dirname, 'tmp/test.png')).size;

			cb(assert(dest < src));
		});
	});
});
