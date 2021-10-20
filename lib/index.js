import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/imagemin/optipng-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/optipng`, 'darwin')
	.src(`${url}linux/x86/optipng`, 'linux', 'x86')
	.src(`${url}linux/x64/optipng`, 'linux', 'x64')
	.src(`${url}freebsd/x86/optipng`, 'freebsd', 'x86')
	.src(`${url}freebsd/x64/optipng`, 'freebsd', 'x64')
	.src(`${url}sunos/x86/optipng`, 'sunos', 'x86')
	.src(`${url}sunos/x64/optipng`, 'sunos', 'x64')
	.src(`${url}win/optipng.exe`, 'win32')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'optipng.exe' : 'optipng');

export default binWrapper;
