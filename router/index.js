/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createRouterFiles = function createRouterFiles() {
  var ext = 'js';
  this.template('router.' + ext, path.join('app/scripts/routers', this.name + '.' + ext));
};
