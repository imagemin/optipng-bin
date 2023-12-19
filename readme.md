# optipng-bin [![test](https://github.com/imagemin/optipng-bin/actions/workflows/test.yml/badge.svg)](https://github.com/imagemin/optipng-bin/actions/workflows/test.yml)

> [OptiPNG](http://optipng.sourceforge.net) is a PNG optimizer that recompresses image files to a smaller size, without losing any information

You probably want [`imagemin-optipng`](https://github.com/imagemin/imagemin-optipng) instead.


## Install

```
$ npm install --save optipng-bin
```


## Usage

```js
import {execFile} from 'node:child_process';
import optipng from 'optipng-bin';

execFile(optipng, ['-out', 'output.png', 'input.png'], error => {
	console.log('Image minified!');
});
```


## CLI

```
$ npm install --global optipng-bin
```

```
$ optipng --help
```
