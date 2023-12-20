import { spawn } from 'child_process';
import fs from 'node:fs';
import process from 'node:process';


const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/imagemin/optipng-bin/v${pkg.version}/vendor`;

function getArch() {
	switch (process.arch) {
		case 'x32':
			return 'x86';
		case 'x64':
			return 'x64'
		case 'arm':
			return 'arm';
		case 'arm64':
			return 'arm64';
		default:
			return null;
	}
}

function getPlatform() {
	switch (process.platform) {
		case 'darwin':
			return 'macos';
		case 'freebsd':
			return 'freebsd'
		case 'linux':
			return 'linux';
		case 'sunos':
			return 'sunos';
		case 'win32':
			return 'win';
		default:
			return null;
	}
}

const lib = {
	path: function () {
		const arch = getArch();
		const platform = getPlatform();
		if (!arch || !platform) {
			return null;
		}
		const url = './vendor'
		return platform == 'win'
			? `${url}/${platform}/optipng.exe`
			: `${url}/${platform}/${arch}/optipng`
	},
	dest: function () {
		return import.meta.url;
	},
	run: function (args) {
		return spawn(this.path(), args);
	}
}

export default lib;
