/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var validDir = require('../helpers/validateDirectory');


module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  this.argument('inherit', { type: String, required: false });

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'controller', 'controllers']
  });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = 'js';
  var baseDir = 'public/';
  
  this.template('controller.' + ext, path.join(baseDir + 'scripts/controllers', this.name + '.' + ext));
};
