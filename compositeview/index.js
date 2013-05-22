/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  this.argument('itemview', { type: String, required: false });
  this.argument('inherit', { type: String, required: false });

  this.option('create-all', { desc: 'Create a new model for this collection' });
  

  /* set the template name which is auto created */
  this.tmplOrig = this.name;
  this.compTmpl = this.name + '_tmpl';
  this.compTmplLocation = 'composite';


  if ( this.itemview && this.options['create-all'] ) {
    this.hookFor('marionette', { as: 'itemview', args: [this.itemview], options: { options: this.options } });
    this.hookFor('marionette', { as: 'tmpl', args: [this.tmplOrig, this.compTmplLocation], options: this.options });
  }
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createCompositeViewFiles = function createCompositeViewFiles() {

  var ext = 'js';
  this.template('compositeview.' + ext, path.join('app/scripts/views/composite', this.name + '.' + ext));
};