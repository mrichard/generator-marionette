/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var _          = require('underscore');
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
    args: [this.name, 'approuter', 'approuters']
  });
  
}

util.inherits(Generator, generator.NamedBase);

// prompts
Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // ask about inheriting, controller, and are we creating the contoller
  var prompts = [{
    name: 'inherit',
    message: 'AppRouter to inherit from?',
    default: 'none'
  },
  {
    name: 'contoller',
    message: 'What is the ' + this.name + ' AppRouter\'s Controller?',
    validate: function( input ) {
      if( !input ) {
        return "Please enter a Controller";
      } else {
        return true;
      }
    }
  },
  {
    type: 'confirm',
    name: 'createAll',
    message: 'Do you need the Controller also created?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.

    // save inherit
    if( props.inherit === 'none' ) {
      this.inherit = null;
    }else {
      this.inherit = props.inherit;
    }

    // save contoller
    if( props.contoller === 'none' ) {
      this.contoller = null;
    }else {
      this.contoller = props.contoller;
    }

    // save create-all
    this.createAll = props.createAll;

    // try running contoller if createAll and contoller present
    if( this.createAll && this.contoller ) {
      var controllerOptions = _.clone(this.options);
      controllerOptions.args = [ this.contoller ];
      this.invoke( "marionette:controller", controllerOptions );
    }

    cb();
  }.bind(this));

};

Generator.prototype.createRouterFiles = function createRouterFiles() {
  var folderPath = pathFinder.getFullFolderPath( 'js', 'approuters' );
  this.template( 'approuter.js', path.join( folderPath, this.name + '.js') );
};
