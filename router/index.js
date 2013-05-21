/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));
  this.argument('model', { type: String, required: false });
  this.option('coffee', { desc: 'CoffeeScript instead standard JavaScript' });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('router.' + ext, path.join('app/scripts/routers', this.name + '.' + ext));
};
