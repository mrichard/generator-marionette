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

  this.argument('tmplLocation', { type: String, required: false });
  

  this.tmplLocation = this.tmplLocation ? this.tmplLocation : '';

  this.name = this.name + "_tmpl";
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createTmplFiles = function createTmplFiles() {
  this.template('tmpl.js', path.join('templates', this.tmplLocation, this.name + '.hbs' ));
};
