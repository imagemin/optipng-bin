'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the optipng binaries', function (t) {
	t.plan(2);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-' + version + '/optipng-' + version + '.tar.gz')
		.cmd('./configure --with-system-zlib --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install');

	builder.build(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'optipng'), function (exists) {
			t.assert(exists);
		});
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
	t.plan(4);

	var args = [
		'-strip', 'all',
		'-clobber',
		'-out', path.join(tmp, 'test.png'),
		path.join(__dirname, 'fixtures/test.png')
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		fs.stat(path.join(__dirname, 'fixtures/test.png'), function (err, a) {
			t.assert(!err, err);

			fs.stat(path.join(tmp, 'test.png'), function (err, b) {
				t.assert(!err, err);
				t.assert(b.size < a.size);
			});
		});
	});
});
