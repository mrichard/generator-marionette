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

  //needed for template
  this.tmpl = this.name + '_tmpl';
  this.tmplLocation = 'item';

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'itemview', 'views/item']
  });
}

util.inherits(Generator, generator.NamedBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'inherit',
    message: 'ItemView to inherit from?',
    default: 'none'
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.

    // save inherit
    if( props.inherit !== 'none' ) {
      this.inherit = props.inherit;
    }else {
      this.inherit = null;
    }

    // invoke template generator
    var templateOptions = _.clone(this.options);
    templateOptions.args = [ this.name, 'item'  ];
    this.invoke( "marionette:tmpl", templateOptions );

    cb();
  }.bind(this));

};

Generator.prototype.createItemViewFiles = function createItemViewFiles() {
  this.template( 'itemview.js', path.join('public/scripts/views/item', this.name + '.js') );
};
