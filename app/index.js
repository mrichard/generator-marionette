var generator = require('yeoman-generator');
var util      = require('util');
var path      = require('path');
var _         = require('underscore.string');

var Generator = module.exports = function Generator() {
  generator.Base.apply(this, arguments);

  this.option('test-framework', { type: String, desc: 'Test framework to use', default: 'buster' });
  this.option('coffee', { desc: 'CoffeeScript instead standard JavaScript' });
  
  this.testFramework = this.options['test-framework'] || 'buster';

  // for hooks to resolve on mocha by default
  if (!this.options['test-framework']) {
    this.options['test-framework'] = 'buster';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainJsFile = this.readFileAsString(path.join(this.sourceRoot(), 'main.' + ext));
};

util.inherits(Generator, generator.Base);

Generator.prototype.askFor = function(first_argument) {
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
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js and Modernizr.');

  var prompts = [{
    name: 'compassBootstrap',
    message: 'Would you like to include Twitter Bootstrap for Sass?',
    default: 'Y/n',
    warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
  },
  {
    name: 'includeRequireJS',
    message: 'Would you like to include RequireJS (for AMD support)?',
    default: 'Y/n',
    warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
  }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = (/y/i).test(props.compassBootstrap);
    this.includeRequireJS = (/y/i).test(props.includeRequireJS);

    cb();
  }.bind(this));
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('package.json');
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('component.json', 'component.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
};

Generator.prototype.bootstrapJs = function bootstrapJs() {
  // TODO: create a Bower component for this
  this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.compassBootstrap) {
    this.write('app/styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  } else {
    this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  }
};

Generator.prototype.writeIndex = function writeIndex() {
  var defaults = ['HTML5 Boilerplate', 'Twitter Bootstrap', 'Backbone'];
  var contentText = [
    '        <div class="container">',
    '            <div class="hero-unit">',
    '                <h1>\'Allo, \'Allo!</h1>',
    '                <p>You now have</p>',
    '                <ul>'
  ];
  if (this.includeRequireJS) {
    defaults.push('RequireJS');
  }

  // iterate over defaults and create content string
  defaults.forEach(function (el) {
    contentText.push('                    <li>' + el  +'</li>');
  });

  contentText = contentText.concat([
    '                </ul>',
    '                <p>installed.</p>',
    '                <h3>Enjoy coding! - Yeoman</h3>',
    '                <h4>Comments: abiee.alejandro@gmail.com</h4>',
    '            </div>',
    '        </div>',
    ''
  ]);

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

/* May be the user needs another amd loader */
Generator.prototype.requirejs = function requirejs() {
  if (this.includeRequireJS) {
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', ['components/requirejs/require.js'], {
      'data-main': 'scripts/main'
    });

    if (this.options.coffee) {
      this.mainJsFile = [
        'require.config(',
        '    paths:',
        '        jquery: \'../components/jquery/jquery\'',
        '        underscore: \'../components/underscore/underscore\'',
        '        backbone: \'../components/backbone/backbone\'',
        '        bootstrap: \'vendor/bootstrap\'',
        '    shim:',
        '        underscore:',
        '            exports: \'_\'',
        '        backbone:',
        '            deps: [\'jquery\', \'underscore\']',
        '            exports: \'Backbone\'',
        '        bootstrap:',
        '            deps: [\'jquery\']',
        '            exports: \'jquery\'',
        ')',
        this.mainJsFile
      ].join('\n');
    } else {
      this.mainJsFile = [
         'require.config({',
        '    paths: {',
        '        jquery: \'../components/jquery/jquery\',',
        '        underscore: \'../components/underscore/underscore\',',
        '        backbone: \'../components/backbone/backbone\',',
        '        bootstrap: \'vendor/bootstrap\'',
        '    },',
        '    shim: {',
        '        underscore: {',
        '            exports: \'_\'',
        '        },',
        '        backbone: {',
        '            deps: [\'jquery\', \'underscore\'],',
        '            exports: \'Backbone\'',
        '        },',
        '        bootstrap: {',
        '            deps: [\'jquery\'],',
        '            exports: \'jquery\'',
        '        }',
        '    }',
        '});',
        '',
        this.mainJsFile
      ].join('\n');
    }
  }
};

Generator.prototype.setupEnv = function setupEnv() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
  this.write('app/scripts/main.' + ext, this.engine(this.mainJsFile, this));
  this.copy('app-name.' + ext, 'app/scripts/' + _.slugify(this.appname) + "." + ext);
};
