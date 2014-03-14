/*jshint latedef:false */
var generator  = require('yeoman-generator');
var fs         = require("fs");
var util       = require('util');
var path       = require('path');
var validDir = require('../helpers/validateDirectory');

module.exports = Generator;

/**
 * expected command variation
 * 1. `$ yo backfire-ts:collection hoge`
 * 2. `$ yo backfire-ts:collection with-model --model foo`
 * 3. `$ yo backfire-ts:collection inherit-with-model --model foo --inherit bar`
 */
function Generator() {
  var pkg = JSON.parse(fs.readFileSync('package.json', "utf8"));
  this.appName = pkg.name.toLowerCase();

  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/typescript';
  this.sourceRoot(path.join(__dirname, dirPath));

  this.argument('model', { type: String, required: false });
  this.argument('inherit', { type: String, required: false });

  this.option('create-all', { desc: 'Create a new model for this collection' });

  if (this.model && this.options['create-all']) {
    this.hookFor('marionette', { as: 'model', args: [this.model, this.inherit], options: this.options });
  }

  // invoke  mocha
  // this.hookFor('mocha-amd', { 
  //   as: 'unitTest', 
  //   args: [this.name, 'collection', 'collections']
  // });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = 'ts';
  var baseDir = validDir.getValidatedFolder( 'app/' );

  this.template('collection.' + ext, path.join(baseDir + 'source/javascripts/'+this.appName+'/collection', this.name + '.' + ext));
};
