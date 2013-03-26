'use strict';
var Mocha = require('mocha');
var mocha = new Mocha({ui: 'bdd', reporter: 'list'});
var build = require('./build.js');
var colors = require('colors');

mocha.addFile('test/test-optipng-path.js');

var runner = mocha.run(function (failures) {
    if (failures > 0){
        build();
    } else{
        console.log('pre-build test passed successfully, skipping build'.green);
    }
});


