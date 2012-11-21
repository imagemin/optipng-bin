/*global describe, it */
'use strict';

var assert = require('assert');
var path = require('path');
var execFile = require('child_process').execFile;

describe('OptiPNG', function() {
	it('should return path to OptiPNG binary', function(cb) {
		var binPath = require('../lib/optipng.js').path;

		execFile(binPath, ['-v'], function(err, stdout) {
			assert(stdout.indexOf('OptiPNG') !== -1);
			cb();
		});
	});

	it('should successfully proxy OptiPNG', function(cb) {
		var binPath = path.join(__dirname, '../bin/optipng');

		execFile(binPath, ['-v'], function(err, stdout) {
			assert(stdout.indexOf('OptiPNG') !== -1);
			cb();
		});
	});
});
