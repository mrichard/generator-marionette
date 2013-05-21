/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  this.argument('inherit', { type: String, required: false });

  this.option('create-all', { desc: 'Create a new model for this collection' });
  this.option('coffee', { desc: 'CoffeeScript instead standard JavaScript' });

  /* set the template name which is auto created */
  this.tmplOrig = this.name;
  this.tmpl = this.name + '_tmpl';
  this.tmplLocation = 'layout';

  if ( this.tmplOrig && this.options['create-all'] ) {
    this.hookFor('marionette', { as: 'tmpl', args: [this.tmplOrig, this.tmplLocation], options: this.options });
  }
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createLayoutFiles = function createLayoutFiles() {

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('layout.' + ext, path.join('app/scripts/views/layout', this.name + '.' + ext));
};
