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
    args: [this.name, 'region', 'regions']
  });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createRegionFiles = function createRegionFiles() {
  var ext = 'js';
  var baseDir = 'public/';

  this.template('region.' + ext, path.join(baseDir + 'scripts/regions', this.name + '.' + ext));
};
