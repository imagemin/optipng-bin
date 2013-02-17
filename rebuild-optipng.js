var exec = require('child_process').exec;
var colors = require('colors');
var binPath = require('./lib/optipng-bin.js').path;
var which = require('which');
var path = require('path');


which('make', function(err, makepath){
    if (err) {
        console.log(err.red);
        return;
    }

    if (process.platform === 'darwin' || process.platform === 'linux') {
        var binDir = path.dirname(binPath);
        var buildScript = 'make clean &&' +
                          './configure --with-system-zlib --bindir=' + binDir  + ' --mandir=man && ' +
                          'make install';
        exec(buildScript, {cwd: './optipng/'}, function(error, stdout, stderr) {
            if (err) {
                console.log(err.red);
                return;
            }

            console.log('OptiPNG rebuilt successfully'.green);
        });
    }
});

