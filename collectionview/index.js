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

  this.argument('itemview', { type: String, required: false });
  this.argument('inherit', { type: String, required: false });

  this.option('create-all', { desc: 'Create a new model for this collection' });
  

  if ( this.itemview && this.options['create-all'] ) {
    this.hookFor('marionette', { as: 'itemview', args: [this.itemview], options: { options: this.options } });
  }

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'collectionview', 'views/collection']
  });
  
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createCollectionViewFiles = function createCollectionViewFiles() {
  var ext = 'js';
  var baseDir = validDir.getValidatedFolder( 'public/' );
  
  this.template('collectionview.' + ext, path.join(baseDir + 'scripts/views/collection', this.name + '.' + ext));
};
