/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var _          = require('underscore');
var validDir = require('../helpers/validateDirectory');


module.exports = Generator;

function Generator() {
  generator.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'region', 'regions']
  });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'inherit',
    message: 'Region to inherit from?',
    default: 'none'
  },
  {
    name: 'htmlid',
    message: 'Element ID to bind the' + this.name + ' Region to?',
    validate: function( input ) {
      if( !input ) {
        return "Please enter an element ID";
      } else {
        return true;
      }
    }
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.

    if( props.inherit !== 'none' ) {
      this.inherit = props.inherit;
    }else {
      this.inherit = null;
    }

    this.htmlid = props.htmlid.replace("#", "");

    cb();
  }.bind(this));

};

Generator.prototype.createRegionFiles = function createRegionFiles() {
  var ext = 'js';
  var baseDir = 'public/';

  this.template('region.' + ext, path.join(baseDir + 'scripts/regions', this.name + '.' + ext));
};
