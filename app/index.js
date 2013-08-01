var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // custom mocha generator
  this.testFramework = 'mocha-amd';

  this.templateFramework = 'handlebars';

  this.hookFor(this.testFramework, { as: 'app' });

  this.on('end', function () {
    if (['app', 'backbone', 'marionette'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
  '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
  '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __'+'\'.___.\''.yellow+'__' +
  '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Handlebars, Require and Modernizr.');


  var prompts = [{
    type: 'confirm',
    name: 'isFullApp',
    message: 'Would you like to install the full express app or simply the marionette generators?'
  },
  {
    type: 'confirm',
    name: 'useMongoose',
    message: 'Would you like to include MongoDB for storage?'
  },
  {
    type: 'confirm',
    name: 'useSocketIO',
    message: 'Would you like to include Socket IO for real time communication?'
  },
  {
    type: 'confirm',
    name: 'useBaucis',
    message: 'Would you like to include Baucis for REST?'
  },
  {
    type: 'string',
    name: 'bowerDirectory',
    message: 'Where do you want the Bower components installed?',
    default: 'bower_components'
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.isFullApp = props.isFullApp;
    this.useMongoose = props.useMongoose;
    this.useSocketIO = props.useSocketIO;
    this.useBaucis = props.useBaucis;
    this.bowerDirectory = props.bowerDirectory;

    //dummy vars for legacy
    this.compassBootstrap = true;
    this.includeRequireJS = true;

    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
  if( this.isFullApp ) {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }
};

Generator.prototype.bower = function bower() {
    this.template('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  if( this.isFullApp ) {
    this.copy('jshintrc', '.jshintrc');
  }
};

Generator.prototype.editorConfig = function editorConfig() {
  if( this.isFullApp ) {
    this.copy('editorconfig', '.editorconfig');
  }
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  if( this.isFullApp ) {
    if (this.compassBootstrap) {
      this.write('app/styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
    } else {
      this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
    }
  }
};


Generator.prototype.bootstrapJs = function bootstrapJs() {
  var _rootDir = this.isFullApp ? 'app/' : '';

  if (this.includeRequireJS && this.compassBootstrap) {
    this.copy('bootstrap.js', _rootDir + 'scripts/vendor/bootstrap.js');
  }
};

Generator.prototype.setupEnv = function setupEnv() {
  var _rootDir = this.isFullApp ? 'app/' : '';

  // templates
  this.mkdir( _rootDir + 'templates' );
  this.copy( 'app/welcome.hbs', _rootDir + 'templates/welcome.hbs');

  // server
  if( this.isFullApp ) {
    this.mkdir('server');
    this.template('server/app.js', 'server/app.js');
  }

  //html
  this.template( 'app/index.html', _rootDir + 'index.html' );

  // js
  this.mkdir( _rootDir + 'scripts' );
  this.copy( 'app/main.js', _rootDir + 'scripts/main.js' );
  this.template( 'app/init.js', _rootDir + 'scripts/init.js' );
  this.copy( 'app/regionManager.js', _rootDir + 'scripts/regionManager.js' );
  this.copy( 'app/application.js', _rootDir + 'scripts/application.js' );
  this.copy( 'app/communicator.js', _rootDir + 'scripts/communicator.js' );

  // other
  if( this.isFullApp ) {
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.template('app/404.html');
    this.template('app/favicon.ico');
    this.template('app/robots.txt');
    this.copy('app/htaccess', 'app/.htaccess');
  }

};

