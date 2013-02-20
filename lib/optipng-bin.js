var path = require('path');
var execSync = require('exec-sync');

if (process.platform === 'darwin') {
    var version = execSync('sw_vers -productVersion');

    if (/10.8/.test(version)) {
        exports.path = path.join(__dirname, '../vendor/osx/10.8', 'optipng');
    } else if (/10.7/.test(version)) {
        exports.path = path.join(__dirname, '../vendor/osx/10.7', 'optipng');
    }
} else if (process.platform === 'linux') {
    if (process.arch === 'x64') {
        exports.path = path.join(__dirname, '../vendor/linux/x64', 'optipng');
    } else {
        exports.path = path.join(__dirname, '../vendor/linux/x86', 'optipng');
    }
} else if (process.platform === 'win32') {
	exports.path = path.join(__dirname, '../vendor/win32', 'optipng.exe');
} else {
	console.log('Unsupported platform:', process.platform, process.arch);
}
