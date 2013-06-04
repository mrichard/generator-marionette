generator-marionette
======================

Yeoman generator for Express, Marionette and Backbone with AMD

Stack
-------
Server: Node, Express, Socket IO. Faye
DB: Mongo
ODM: Mongoose
Client: 
    Backbone - 
        http://backbonejs.org/
    Marionette - 
        https://github.com/marionettejs/backbone.marionette
    jQuery - 
        http://jquery.com/
    Require - 
        http://requirejs.org/
    Handlebars - 
        http://handlebarsjs.com/
        https://github.com/SlexAxton/require-handlebars-plugin
        https://github.com/asciidisco/Backbone.Marionette.Handlebars
    SASS-Bootstrap -
        http://twitter.github.io/bootstrap
        https://github.com/thomas-mcdonald/bootstrap-sass
Tooling: Yeoman, Bower, Grunt


Directory structure
-------
app/                                --> client side files
    /bower_components               --> bower installs
    /images
    /scripts
        /vendor                     --> 3rd party scripts
        /models
        /collections
        /controllers
        /routers
        /regions
        /views
            /item
            /collection
            /composite
            /layout
        init.js                     --> require configuration
        main.js                     --> application starting point
        application.js              --> application file

    /styles                         --> scss files
    /templates                      --> handlebar templates

server/                             --> node server files
test/                               --> unittesting


Install
-------
First make sure you have MongoDB, Node, Npm, Yeoman, Bower and Grunt installed.

Install mongoDB with: brew install mongodb or visit http://www.mongodb.org/

Visit nodejs.org to install node and NPM

To install Yeoman, Bower and Grunt run: npm install -g yo grunt-cli bower

Install mocha generator: npm -g install generator-mocha

You can install marionette generator

    $ npm install generator-marionette

Or:

    $ npm install git://github.com/mrichard/generator-marionette.git



Bootstrap project
-----------------
To bootstrap a new project simply run

    $ yo marionette

You have options to include a few Node packages. The client side libraries are set for now. 



Create routers
--------------
You can generate routers too with

    $ yo marionette:router router-name



Create model
------------
To add a Backbone model to the project use the model generator like this

    $ yo marionette:model model-name

Or to inherit from an existing model

    $ yo marionette:model model-name --inherit model-name



Create collection
-----------------
To add a Backbone collection to the project use collection generator

    $ yo marionette:collection collection-name

You can link the collection with an existent model

    $ yo marionette:collection collection-name model-name

Or may be you want to create both, model and collection on one step

    $ yo marionette:collection collection-name --model model-name --create-all

Or you may want to inherit from another collection

    $ yo marionette:collection collection-name --model model-name --inherit collection-name --create-all




Create views
------------
Backbone works with view definitions, to create one use this command. It is recommended to use Marionette views instead of the standard Backbone view

    $ yo marionette:view view-name




Create item views
------------
Create a Marionette ItemView and link to an existing template at location templates/[template-location]

    $ yo marionette:itemview view-name 

You may want to inherit from another itemview

    $ yo marionette:itemview view-name --inherit view-name

Or maybe you want to create both, itemView and template on one step

    $ yo marionette:itemview view-name --create-all



Create collection views
------------
Create a Marionette CollectionView that is associated to an existing itemview

    $ yo marionette:collectionview view-name --itemview itemview-name

Or inherit from another collectionview

    $ yo marionette:collectionview view-name --itemview itemview-name --inherit view-name

Or maybe you want to create both, itemview (with template) and collectionview.

    $ yo  marionette:collectionview view-name --itemview itemview-name --create-all




Create composite views
------------
Create a Marionette CompositeView

    $ yo marionette:compositeview view-name --itemview itemview-name

Or inherit from another CompositeView

    $ yo marionette:compositeview view-name --itemview itemview-name --inherit view-name

Or maybe you want to create all, itemview and compositeview and both templates. 

    $ yo marionette:compositeview view-name --itemview itemview-name --create-all




Create regions
------------
Create a Marionette Region

    $ yo marionette:region region-name

Or inherit from another Region

    $ yo marionette:region region-name --inherit region-name




Create layouts
------------
Create a Marionette Layout and link to an existing template at location templates/[template-location]

    $ yo marionette:layout layout-name

Or inherit from another layout

    $ yo marionette:layout layout-name --inherit layout-name

Or maybe you want to create both, Layout and template on one step

    $ yo marionette:layout layout-name --create-all



Create controller
------------
Create a Marionette Controller

    $ yo marionette:controller controller-name

Or inherit from another Controller

    $ yo marionette:controller controller-name --inherit controller-name


Create templates
------------
Create a handle bars tmpl

    $ yo marionette:tmpl tmpl-name --tmplLocation tmpl-location




Testing
-------
Default test framework for this generator is mocha



TO DO's
------- 
* Build a module generator
* Auto generate failing unit tests

