# optipng-bin ![GitHub Actions Status](https://github.com/imagemin/optipng-bin/workflows/test/badge.svg?branch=master)

> [OptiPNG](http://optipng.sourceforge.net) is a PNG optimizer that recompresses image files to a smaller size, without losing any information

You probably want [`imagemin-optipng`](https://github.com/imagemin/imagemin-optipng) instead.


## Install

```
$ npm install --save optipng-bin
```


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
