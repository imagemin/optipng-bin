var exec = require('child_process').exec;
var colors = require('colors');

if (process.platform === 'darwin' || process.platform === 'linux') {
    exec('make clean && ./configure && make && make test', {cwd: './optipng/', stdio: 'inherit'}, function(error, stdout, stderr) {
        exec('cp optipng/src/optipng/optipng vendor/osx/', function(err){
            if (err) {
                console.log(err.red);
                return;
            }

            console.log('OptiPNG rebuilt successfully for OSX'.green);
        });
    });
}
