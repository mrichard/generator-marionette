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

  this.argument('itemview', { type: String, required: false });
  this.argument('inherit', { type: String, required: false });

  this.option('create-all', { desc: 'Create a new model for this collection' });
  

  /* set the template name which is auto created */
  this.compTmpl = this.name + '_tmpl';
  this.compTmplLocation = 'composite';


  /*if ( this.itemview && this.options['create-all'] ) {
    this.hookFor('marionette', { as: 'itemview', args: [this.itemview], options: { options: this.options } });
    this.hookFor('marionette', { as: 'tmpl', args: [this.tmplOrig, this.compTmplLocation], options: this.options });
  }*/

  // invoke  mocha
  this.hookFor('mocha-amd', { 
    as: 'unitTest', 
    args: [this.name, 'compositeview', 'views/composite']
  });
}

util.inherits(Generator, generator.NamedBase);


// prompts
Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // ask about inheriting, CompositeView ItemView, and are we creating the ItemView
  var prompts = [{
    name: 'inherit',
    message: 'CompositeView to inherit from?',
    default: 'none'
  },
  {
    name: 'itemview',
    message: 'What is the ' + this.name + ' CompositeView\'s ItemView?',
    validate: function( input ) {
      if( !input ) {
        return "Please enter an ItemView";
      } else {
        return true;
      }
    }
  },
  {
    type: 'confirm',
    name: 'createAll',
    message: 'Do you need the ItemView also created?',
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
    if( props.itemview === 'none' ) {
      this.itemview = null;
    }else {
      this.itemview = props.itemview;
    }

    // save create-all
    this.createAll = props.createAll;

    // try running itemview if createAll and itemview present
    if( this.createAll && this.itemview ) {
      var itemViewOptions = _.clone(this.options);
      itemViewOptions.args = [ this.itemview ];
      this.invoke( "marionette:itemview", itemViewOptions );
    }

    // invoke template generator
    var templateOptions = _.clone(this.options);
    templateOptions.args = [ this.name, 'composite'  ];
    this.invoke( "marionette:tmpl", templateOptions );

    cb();
  }.bind(this));

};


Generator.prototype.createCompositeViewFiles = function createCompositeViewFiles() {
  var ext = 'js';
  var baseDir = 'public/';

  this.template('compositeview.' + ext, path.join(baseDir + 'scripts/views/composite', this.name + '.' + ext));
};