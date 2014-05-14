var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _          = require('underscore');
var pathFinder = require('../helpers/pathFinder');

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
  '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to Yeoman!!!') + ',    |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Handlebars, Require and Modernizr.');


  var prompts = [
  // backend
  {
    type: 'confirm',
    name: 'needsBackend',
    message: 'Would you like express/mongo as a backend?',
    default: true
  },
  //sass/css
  {
    type: 'confirm',
    name: 'needsSass',
    message: 'Would you like sass installed?',
    default: true
  },

  // customizing directories
  {
    type: 'confirm',
    name: 'customizeDirectories',
    message: 'Do you want to customize the folder structure?',
    default: false
  },

  // server directory
  {
    name: 'serverDirectory',
    message: 'Directory for server files?',
    default: 'server',
    when: function( answers ) {
      if( answers.customizeDirectories && answers.needsBackend ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  // root directory
  {
    name: 'rootDirectory',
    message: 'Root web directory?',
    default: 'public',
    when: function( answers ) {
      if( answers.customizeDirectories ) {
        return true;
      }
      else {
        return false;
      }
    }

  },

  // SASS
  {
    name: 'cssDirectory',
    message: 'Directory for SASS files (placed in web directory)?',
    default: 'styles',
    when: function( answers ) {
      if( answers.customizeDirectories && answers.needsSass ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  //CSS
  {
    name: 'cssDirectory',
    message: 'Directory for CSS files (placed in web directory)?',
    default: 'styles',
    when: function( answers ) {
      if( answers.customizeDirectories && !answers.needsSass ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  // JS
  {
    name: 'jsDirectory',
    message: 'Directory for JS files (placed in web directory)?',
    default: 'scripts',
    when: function( answers ) {
      if( answers.customizeDirectories ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  // images
  {
    name: 'imageDirectory',
    message: 'Directory for image files (placed in web directory)?',
    default: 'images',
    when: function( answers ) {
      if( answers.customizeDirectories ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  // templates
  {
    name: 'templateDirectory',
    message: 'Directory for template files (placed in web directory)?',
    default: 'templates',
    when: function( answers ) {
      if( answers.customizeDirectories ) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  // bower components
  {
    name: 'bowerDirectory',
    message: 'Directory for bower dependencies (placed in web directory)?',
    default: 'bower_components',
    when: function( answers ) {
      if( answers.customizeDirectories ) {
        return true;
      }
      else {
        return false;
      }
    }
  }];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
      /*this.rootDirectory = props.rootDirectory;
      this.serverDirectory = props.serverDirectory;
      this.jsDirectory = props.jsDirectory;
      this.cssDirectory = props.cssDirectory;
      this.imageDirectory = props.imageDirectory;
      this.templateDirectory = props.templateDirectory;
      this.bowerDirectory = props.bowerDirectory;
     */

    //this.needsBackend = props.needsBackend;
    //this.needsSass = props.needsSass;

    props = props || {};

    // save all directory variables if not coming from prompts
    if( !this.customizeDirectories ) {
      props.rootDirectory = 'public';
      props.serverDirectory = 'server';
      props.jsDirectory = 'scripts';
      props.cssDirectory = 'styles';
      props.imageDirectory = 'images';
      props.templateDirectory = 'templates';
      props.bowerDirectory = 'bower_components';
    }

    // store context and data in pathfinder
    pathFinder.loadData( props );


    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
    this.template('gitignore', '.gitignore', _.extend( this, pathFinder.getAllFolderData() ) );
    this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
    this.template('bowerrc', '.bowerrc', _.extend( this, pathFinder.getAllFolderData() ) );
    this.copy('_bower.json', 'bower.json');
};

Generator.prototype.appFolderFile = function appFolderFile() {
    this.template('marionette-generator.yaml', '.marionette-generator.yaml', _.extend( this, pathFinder.getAllFolderData() ) );
};

Generator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};


//TODO -!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_
Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js', 'Gruntfile.js', _.extend( this, pathFinder.getAllFolderData() ) );
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json', _.extend( this, pathFinder.getAllFolderData() ));
};

Generator.prototype.mainStylesheet = function mainStylesheet() {

  if (this.needsSass) {
    this.write( path.join( pathFinder.getFullFolderPath('css'), 'main.scss' ), '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
  } else {
    this.write( path.join( pathFinder.getFullFolderPath('css'), 'main.css' ), 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  }

};


Generator.prototype.bootstrapJs = function bootstrapJs() {
    this.copy('bootstrap.js',  path.join( pathFinder.getFullFolderPath('js'), 'vendor/bootstrap.js') );
};

Generator.prototype.setupEnv = function setupEnv() {

  // templates
  this.mkdir( pathFinder.getFullFolderPath('tmpl') );
  this.copy( 'app/welcome.hbs', path.join( pathFinder.getFullFolderPath('tmpl'), 'welcome.hbs') );

  // server
  if( this.needsBackend ) {

    this.mkdir( path.join( pathFinder.getUnitFolderPath('server') ) );

    this.template('server/app.js', path.join( pathFinder.getUnitFolderPath('server'), 'app.js'), _.extend( this, pathFinder.getAllFolderData(), {
      serverToWebRelativePath: pathFinder.getRelativePath( 'server', 'root' ),
      serverToTemplateRelativePath: pathFinder.getRelativePath( 'server', 'tmpl' )
    } ) );
  }

  //html 
  this.template( 'app/index.html', path.join( pathFinder.getUnitFolderPath('root'), 'index.html') );

  // js
  this.mkdir( pathFinder.getFullFolderPath('js') );
  this.copy( 'app/main.js', path.join( pathFinder.getFullFolderPath('js'), 'main.js' ) );

  this.template( 'app/init.js', path.join( pathFinder.getFullFolderPath('js'), 'init.js' ), _.extend( this, pathFinder.getAllFolderData(), {
    jsToBowerRelativePath: pathFinder.getRelativePath( 'js', 'bower' ),
    jsToTemplateRelativePath: pathFinder.getRelativePath( 'js', 'tmpl' )
  } ) );

  this.copy( 'app/regionManager.js', path.join( pathFinder.getFullFolderPath('js'), 'regionManager.js' ) );
  this.copy( 'app/application.js', path.join( pathFinder.getFullFolderPath('js'), 'application.js' ) );
  this.copy( 'app/communicator.js', path.join( pathFinder.getFullFolderPath('js'), 'communicator.js' ) );

  // other
  this.mkdir( pathFinder.getFullFolderPath('css') );
  this.mkdir( pathFinder.getFullFolderPath('img') );

  this.template('app/404.html', path.join( pathFinder.getUnitFolderPath('root'), '404.html' ) );
  this.template('app/favicon.ico', path.join( pathFinder.getUnitFolderPath('root'), 'favicon.ico' ) );
  this.template('app/robots.txt', path.join( pathFinder.getUnitFolderPath('root'), 'robots.txt' ) );

  this.copy('app/htaccess', path.join( pathFinder.getUnitFolderPath('root'), '.htaccess' ) );

};

