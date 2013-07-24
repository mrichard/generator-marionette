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

  this.hookFor('mocha-amd', { as: 'model', args: [this.name] });
  
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  var ext = 'js';
  var baseDir = validDir.getValidatedFolder( 'app/' );
  
  this.template('model.' + ext, path.join(baseDir + 'scripts/models', this.name + '.' + ext));
};
