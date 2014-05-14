/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var _          = require('underscore');
var validDir = require('../helpers/validateDirectory');
var pathFinder = require('../helpers/pathFinder');


module.exports = Generator;

function Generator() {
  generator.generators.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  // invoke  mocha
  this.hookFor('mocha-amd', {
    as: 'unitTest',
    args: [this.name, 'model', 'models']
  });
};

util.inherits(Generator, generator.NamedBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'inherit',
    message: 'Model to inherit from?',
    default: 'none'
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.

    if( props.inherit !== 'none' ) {
      this.inherit = props.inherit;
    }else {
      this.inherit = null;
    }

    cb();
  }.bind(this));

};

Generator.prototype.createModelFiles = function createModelFiles() {
  var folderPath = pathFinder.getFullFolderPath( 'js', 'models' );
  this.template( 'model.js', path.join( folderPath, this.name + '.js' ) );
};
