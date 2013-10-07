/*global describe, it, after */
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');

describe('optipng()', function () {
	after(function () {
		fs.unlinkSync('test/minified.png');
	});

	it('should return path to optipng binary', function (cb) {
		var binPath = require('../lib/optipng').path;

		execFile(binPath, ['-v', '-'], function (err, stdout, stderr) {
			assert(stderr.toString().indexOf('OptiPNG') !== -1);
			cb();
		});
	});

	it('should successfully proxy optipng', function (cb) {
		var binPath = path.join(__dirname, '../bin/optipng.js');

		execFile('node', [binPath, '-v', '-'], function (err, stdout, stderr) {
			assert(stderr.toString().indexOf('OptiPNG') !== -1);
			cb();
		});
	});

	it('should minify a .png', function (cb) {
		var binPath = path.join(__dirname, '../bin/optipng.js');
		var args = [
			'-strip', 'all',
			'-clobber',
			'-out', path.join(__dirname, 'minified.png'),
			path.join(__dirname, 'fixtures', 'test.png')
		];

		execFile('node', [binPath].concat(args), function () {
			var actual = fs.statSync('test/minified.png').size;
			var original = fs.statSync('test/fixtures/test.png').size;

			assert(actual < original);
			cb();
		});
	});
});
