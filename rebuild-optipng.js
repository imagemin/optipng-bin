var exec = require('child_process').exec;
var colors = require('colors');
var path = require('./lib/optipng-bin.js').path;

if (process.platform === 'darwin' || process.platform === 'linux') {
    exec('make clean && ./configure && make && make test', {cwd: './optipng/', stdio: 'inherit'}, function(error, stdout, stderr) {
        exec('cp optipng/src/optipng/optipng ' + path, function(err){
            if (err) {
                console.log(err.red);
                return;
            }

            console.log('OptiPNG rebuilt successfully'.green);
        });
    });
}
