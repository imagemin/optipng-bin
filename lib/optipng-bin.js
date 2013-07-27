'use strict';

var path = require('path');
var which = require('which');

var target = {
	name: 'optipng',
	pathPrefix: ['..', 'vendor'],
	platforms: {
		darwin: {
			path: 'osx'
		},
		linux: {
			path: 'linux',
			arch: true
		},
		win32: {
			path: 'win',
			suffix: 'exe'
		},
		freebsd: {
			path: 'freebsd',
			arch: true
		}
	}
};

exports.path = setPath(target);

function setPath(target) {
	try {
		return which.sync(target.name);
	}
	catch(e) {
		console.log(e);
		return getPathToPackagedBinary(target);
	}
}

function getPathToPackagedBinary(target) {
	var platform = target.platforms[process.platform];
	if (platform === undefined) {
		console.error('Unsupported platform:', process.platform, process.arch);
	} else {
		var targetpath = target.pathPrefix;
		var arch = process.arch === 'x64' ? 'x64' : 'x86';
		var exec = target.name;

		targetpath.unshift(__dirname);
		targetpath.push(platform.path);

		if (platform.arch === true) {
			targetpath.push(arch);
		}
		if (platform.suffix !== undefined) {
			exec += '.' + platform.suffix;
		}
		targetpath.push(exec);

		return path.join.apply(__dirname, targetpath);
	}
}
