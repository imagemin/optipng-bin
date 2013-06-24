var path = require('path');
var which = require('which');

exports.path = setPath();

function setPath(){
  try {
    var optipath = which.sync('optipng');
    return optipath;
  }
  catch(e) {
    console.log(e);
    if (process.platform === 'darwin') {
      return path.join(__dirname, '../vendor/osx', 'optipng');
    } else if (process.platform === 'linux') {
      if (process.arch === 'x64') {
        return path.join(__dirname, '../vendor/linux/x64', 'optipng');
	    } else {
        return path.join(__dirname, '../vendor/linux/x86', 'optipng');
      }
    } else if (process.platform === 'win32') {
      return path.join(__dirname, '../vendor/win32', 'optipng.exe');
    } else {
      console.log('Unsupported platform:', process.platform, process.arch);
    }
  }
} 


