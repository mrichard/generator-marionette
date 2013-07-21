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

  
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createRouterFiles = function createRouterFiles() {
  var ext = 'js';
  var baseDir = validDir.getValidatedFolder( 'app/' );

  this.template('router.' + ext, path.join(baseDir + 'scripts/routers', this.name + '.' + ext));
};
