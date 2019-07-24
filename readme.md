# optipng-bin [![Build Status](https://travis-ci.org/imagemin/optipng-bin.svg?branch=master)](https://travis-ci.org/imagemin/optipng-bin)

> [OptiPNG](http://optipng.sourceforge.net) is a PNG optimizer that recompresses image files to a smaller size, without losing any information

You probably want [`imagemin-optipng`](https://github.com/imagemin/imagemin-optipng) instead.


## Install

```
$ npm install --save optipng-bin
```


## Binary configuration parameters

You can configure an alternate download URL for the precompiled optipng binary. The structure should follow the following convention:

OS      | URL                                   | Architecture
--------|---------------------------------------|-------------
MacOS   | http://example.com/macos/optipng      | darwin
Windows | http://example.com/win/optipng.exe    | win32
Linux   | http://examle.com/linux/x86/optipng   | x86
Linux   | http://examle.com/linux/x64/optipng   | x64
FreeBSD | http://examle.com/freebsd/x86/optipng | x86
FreeBSD | http://examle.com/freebsd/x64/optipng | x64
SunOS   | http://examle.com/sunos/x86/optipng   | x86
SunOS   | http://examle.com/sunos/x64/optipng   | x64

Following parameters are supported:

Variable name       | .npmrc parameter    | Value
--------------------|---------------------|------
OPTIPNG_BINARY_SITE | optipng_binary_site | URL

These parameters can be used as environment variable:

* E.g. `export OPTIPNG_BINARY_SITE=http://example.com/`

As local or global [.npmrc](https://docs.npmjs.com/misc/config) configuration file:

* E.g. `optipng_binary_site=http://example.com/`


## Usage

```js
const {promisify} = require('util');
const {execFile} = require('child_process');
const optipng = require('optipng-bin');

const execFileP = promsify(execFile);

(async () => {
	await execFile(optipng, ['-out', 'output.png', 'input.png']);
	console.log('Image minified!');
})();
```


## CLI

```
$ npm install --global optipng-bin
```

```
$ optipng --help
```
