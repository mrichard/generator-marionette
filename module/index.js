/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var validDir = require('../helpers/validateDirectory');
var fs = require('fs');

module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));


//  // invoke  mocha
//  this.hookFor('mocha-amd', {
//    as: 'unitTest',
//    args: [this.name, 'module', 'modules']
//  });
//
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.createModuleFiles = function createModuleFiles() {
  var ext = 'js',
	  baseDir = validDir.getValidatedFolder( 'app/'),
	  modulesDir;// = baseDir + validDir.getValidatedFolder('scripts/modules');

	// If no module folder create it
	if (validDir.getValidatedFolder(baseDir + 'scripts/modules').length <= 0) {
		fs.mkdir(baseDir + 'scripts/modules');
	}

//	console.log(baseDir, modulesDir, modulesDir + this.name + '.' + ext);

  this.template('module.' + ext, path.join(baseDir +        'scripts/modules', this.name + '.' + ext));
};
