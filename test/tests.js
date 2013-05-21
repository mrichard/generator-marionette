/*global describe beforeEach it*/

var path    = require('path');
var generator = require('yeoman-generator');
var util = require('util')
var helpers = require('yeoman-generator').test;
var assert  = require('assert');

describe('Backbone AMD generator test', function () {
  var backbone;

  beforeEach(function (done) {
    var deps = [
      '../../app',
      '../../model',
      '../../collection',
      '../../view',
      '../../router', [
        helpers.createDummyGenerator(),
        'buster:app'
      ]
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      backbone = helpers.createGenerator('backbone-amd:app', deps);
      done();
    });
  });

  it('creates expected files', function(done) {
    var expected = [
      ['component.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/.htaccess',
      '.gitignore',
      '.gitattributes',
      ['.bowerrc', /"directory": "app\/components"/],
      ['component.json', /"name":\s+"temp"/],
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      ['app/scripts/main.js', /'temp',\s+'jquery',\s+/],
      ['app/scripts/temp.js', /Temp\s+=\s+[\w\W\s]+Views[\w\W\s]+Models[\w\W\s]+Collections[\w\W\s]+Routers/]
    ];

    helpers.mockPrompt(backbone, {
      'compassBootstrap': 'Y',
      'includeRequireJS': 'N'
    });

    backbone.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('include requirejs', function(done) {
    var expected = [
      ['component.json', /"requirejs"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      ['app/index.html', /<script data-main=\"scripts\/main\" src=\"components\/requirejs\/require\.js\">/],
      'app/.htaccess',
      '.gitignore',
      '.gitattributes',
      ['.bowerrc', /"directory": "app\/components"/],
      ['component.json', /"name":\s+"temp"/],
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      ['app/scripts/main.js', /require.config\(\{[\w\W\s]+'temp',\s+'jquery',\s+/],
      ['app/scripts/temp.js', /Temp\s+=\s+[\w\W\s]+Views[\w\W\s]+Models[\w\W\s]+Collections[\w\W\s]+Routers/]
    ];

    helpers.mockPrompt(backbone, {
      'compassBootstrap': 'Y',
      'includeRequireJS': 'Y'
    });

    backbone.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  describe('Backbone Model', function() {
    it('creates backbone model', function(done){
      var model;
      model = helpers.createGenerator('backbone-amd:model',['../../model'], ['foo']);

      model.run([], function(){
        helpers.assertFiles([
          ['app/scripts/models/foo.js',
            /FooModel = Backbone.Model.extend\(\{[\w\W\s]+Temp.Models.FooModel = FooModel[\w\W\s]+return FooModel/]
        ]);
      });
      done();
    });
  });

  describe('Backbone Collections', function() {
    it('creates backbone collection', function(done){
      var model;
      model = helpers.createGenerator('backbone-amd:collection',['../../collection'], ['foo']);

      model.run([], function(){
        helpers.assertFiles([
          ['app/scripts/collections/foo.js',
            /FooCollection = Backbone.Collection.extend\(\{[\w\W\s]+Temp.Collections.FooCollection = FooCollection[\w\W\s]+return FooCollection/]
        ]);
      });
      done();
    });
  });

  describe('Backbone Views', function() {
    it('creates backbone view', function(done){
      var model;
      model = helpers.createGenerator('backbone-amd:view',['../../view'], ['foo']);

      model.run([], function(){
        helpers.assertFiles([
          ['app/scripts/views/foo.js',
            /FooView = Backbone.View.extend\(\{[\w\W\s]+Temp.Views.FooView = FooView[\w\W\s]+return FooView/]
        ]);
      });
      done();
    });
  });

  describe('Backbone Router', function() {
    it('creates backbone router', function(done){
      var model;
      model = helpers.createGenerator('backbone-amd:router',['../../router'], ['foo']);

      model.run([], function(){
        helpers.assertFiles([
          ['app/scripts/routers/foo.js',
            /FooRouter = Backbone.Router.extend\(\{[\w\W\s]+Temp.Routers.FooRouter = FooRouter[\w\W\s]+return FooRouter/]
        ]);
      });
      done();
    });
  });
});
