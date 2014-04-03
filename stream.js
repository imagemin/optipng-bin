'use strict';

var fs = require('fs');
var optipng = require('./').path;
var rm = require('rimraf');
var spawn = require('win-spawn');
var tempfile = require('tempfile');
var through = require('through2');

/**
 * Streaming interface for OptiPNG
 */

module.exports = function (args) {
	var src = tempfile('.png');
	var dest = tempfile('.png');

	return through(function (chunk, enc, cb) {
		args = args.concat(['-out', dest, src]);

		var cp = spawn(optipng, args);
		var self = this;

		fs.writeFileSync(src, chunk);

		cp.on('exit', function () {
			var data = fs.readFileSync(dest);

			rm.sync(src);
			rm.sync(dest);

			self.push(data);
			cb();
		});
	});
};
