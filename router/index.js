/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var validDir = require('../helpers/validateDirectory');
var pathFinder = require('../helpers/pathFinder');


module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'router', 'routers']
  });
  
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createRouterFiles = function createRouterFiles() {
	var folderPath = pathFinder.getFullFolderPath( 'js', 'routers' );
  this.template('router.js', path.join( folderPath, this.name + '.js' ) );
};
