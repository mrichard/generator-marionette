var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

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
  '\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
  '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to Yeoman') + ',    |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Handlebars, Require and Modernizr.');


  var prompts = [{
    type: 'confirm',
    name: 'needsBackend',
    message: 'Would you like express/mongo as a backend?'
  },
  {
    type: 'confirm',
    name: 'needsSass',
    message: 'Would you like sass installed?'
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.needsBackend = props.needsBackend;
    this.needsSass = props.needsSass;

    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
    this.template('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {

  if (this.needsSass) {
    this.write('public/styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
  } else {
    this.write('public/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  }

};


Generator.prototype.bootstrapJs = function bootstrapJs() {

    this.copy('bootstrap.js', 'public/scripts/vendor/bootstrap.js');
};

Generator.prototype.setupEnv = function setupEnv() {

  // templates
  this.mkdir( 'templates/' );
  this.copy( 'app/welcome.hbs', 'templates/welcome.hbs');

  // server
  if( this.needsBackend ) {
    this.mkdir('server');
    this.template('server/app.js', 'server/app.js');
  }

  //html
  this.template( 'app/index.html', 'public/index.html' );

  // js
  this.mkdir( 'public/scripts' );
  this.copy( 'app/main.js', 'public/scripts/main.js' );
  this.template( 'app/init.js', 'public/scripts/init.js' );
  this.copy( 'app/regionManager.js', 'public/scripts/regionManager.js' );
  this.copy( 'app/application.js', 'public/scripts/application.js' );
  this.copy( 'app/communicator.js', 'public/scripts/communicator.js' );

  // other
  this.mkdir('public/styles');
  this.mkdir('public/images');
  this.template('app/404.html', 'public/404.html');
  this.template('app/favicon.ico', 'public/favicon.ico');
  this.template('app/robots.txt', 'public/robots.txt');
  this.copy('app/htaccess', 'public/.htaccess');

};

