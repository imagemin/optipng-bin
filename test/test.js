'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the optipng binaries', function (t) {
	t.plan(2);

	new BinBuild()
		.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.5/optipng-0.7.5.tar.gz')
		.cmd('./configure --with-system-zlib --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.run(function (err) {
			t.assert(!err, err);
			t.assert(fs.existsSync(path.join(tmp, 'optipng')));
		});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a PNG', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test.png');
	var args = [
		'-strip', 'all',
		'-clobber',
		'-out', dest,
		src
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});
