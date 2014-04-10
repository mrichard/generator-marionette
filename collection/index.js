/*jshint latedef:false */
var generator  = require('yeoman-generator');
var util       = require('util');
var path       = require('path');
var _          = require('underscore');
var validDir = require('../helpers/validateDirectory');

module.exports = Generator;

function Generator() {
  generator.generators.NamedBase.apply(this, arguments);
  var dirPath = '../templates/javascript';
  this.sourceRoot(path.join(__dirname, dirPath));

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'collection', 'collections']
  });
};

util.inherits(Generator, generator.NamedBase);


// prompts
Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // ask about inheriting, collection model, and are we creating the model
  var prompts = [{
    name: 'inherit',
    message: 'Collection to inherit from?',
    default: 'none'
  },
  {
    name: 'model',
    message: 'What is the ' + this.name + ' Collection\'s model?',
    default: 'none'
  },
  {
    type: 'confirm',
    name: 'createAll',
    message: 'Do you need the Model also created?',
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

    // save model
    if( props.model === 'none' ) {
      this.model = null;
    }else {
      this.model = props.model;
    }

    // save create-all
    this.createAll = props.createAll;

    // try running model if createAll and model present
    if( this.createAll && this.model ) {
      var modelOptions = _.clone(this.options);
      modelOptions.args = [ this.model ];
      this.invoke( "marionette:model", modelOptions );
    }

    cb();
  }.bind(this));

};


Generator.prototype.createCollectionFiles = function createCollectionFiles() {
  var ext = 'js';
  var baseDir = 'public/';

  this.template('collection.' + ext, path.join(baseDir + 'scripts/collections', this.name + '.' + ext));
};
