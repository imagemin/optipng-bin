/* eslint-env mocha */
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var pathExists = require('path-exists');
var rimraf = require('rimraf');
var tmp = path.join(__dirname, 'tmp');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('rebuild the optipng binaries', function (cb) {
	new BinBuild()
		.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.5/optipng-0.7.5.tar.gz')
		.cmd('./configure --with-system-zlib --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.run(function (err) {
			if (err) {
				cb(err);
				return;
			}

			assert(pathExists.sync(path.join(tmp, 'optipng')));
			cb();
		});
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../'), ['--version'], function (err, works) {
		if (err) {
			cb(err);
			return;
		}

		assert(works);
		cb();
	});
});

it('minify a PNG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test.png');
	var args = [
		'-strip', 'all',
		'-clobber',
		'-out', dest,
		src
	];

	execFile(require('../'), args, function (err) {
		if (err) {
			cb(err);
			return;
		}

		compareSize(src, dest, function (err, res) {
			if (err) {
				cb(err);
				return;
			}

			assert(res[dest] < res[src]);
			cb();
		});
	});
});
