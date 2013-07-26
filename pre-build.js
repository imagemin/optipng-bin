'use strict';

var fs = require('fs');
var request = require('request');
var colors = require('colors');
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'min'});
var build = require('./build.js');

function runTest() {
	mocha.addFile('test/test-optipng-path.js');
	mocha.run(function (failures) {
		if (failures > 0) {
			console.log('pre-build test failed, compiling from source...'.red);
			build();
		} else {
			console.log('pre-build test passed successfully, skipping build...'.green);
		}
	});
}

var binPath = require('./lib/optipng-bin').binPath;
var binUrl = require('./lib/optipng-bin').binUrl;

fs.exists(binPath, function (exists) {
	if (exists) {
		runTest();
	} else {
		request.get(binUrl)
			.pipe(fs.createWriteStream(binPath))
			.on('close', function () {
					fs.chmod(binPath, '0755');
					runTest();
				});
	}
});
