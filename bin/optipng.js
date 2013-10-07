#!/usr/bin/env node
'use strict';

var binPath = require('../lib/optipng').path;
var spawn = require('child_process').spawn;

console.log(binPath);

spawn(binPath, process.argv.slice(2), { stdio: 'inherit' })
	.on('exit', process.exit);
