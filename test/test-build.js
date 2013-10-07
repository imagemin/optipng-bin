/*global describe, it */
'use strict';

var assert = require('assert');
var Bin = require('bin-wrapper');
var fs = require('fs');
var options = require('../lib/optipng').options;
var path = require('path');

describe('optipng.build()', function () {
	it('should rebuild the optipng binaries', function (cb) {
		this.timeout(false);

		options.path = path.join(__dirname, '../tmp');
		options.buildScript = './configure --with-system-zlib --bindir=' + path.join(__dirname, '../tmp') +
				 			  ' --mandir=man && make install';

		var bin = new Bin(options);

		bin.build(function () {
			var origCTime = fs.statSync(bin.path).ctime;
			var actualCTime = fs.statSync(bin.path).ctime;

			assert(actualCTime !== origCTime);
			cb();
		});
	});
});
