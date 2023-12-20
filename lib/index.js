import { spawn } from 'child_process';
import process from 'node:process';

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
