generator-marionette
======================

Yeoman generator for Marionette and Backbone with AMD capabilities

Install
-------
You can install this generator by two ways, clonning repo and linking or install by npm. To install clonnig repo run:

    $ git clone https://github.com/mrichard/generator-marionette.git
    $ generator-marionette
    $ npm link

Or to install by npm run:

    $ npm install generator-marionette NOTE DONE YET!!!

Bootstrap project
-----------------
To bootstrap a new project simply run

    $ yo marionette



Create routers
--------------
You can generate routers too with

    $ yo marionette:router router-name

Or with coffee option

    $ yo marionette:router router-name --coffee



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
Backbone works with view definitions, to create one use this command

    $ yo marionette:view view-name

If you prefer CoffeeScript instead just add --coffee flag

    $ yo marionette:view view-name --coffee



Create item views
------------
Create a Marionette ItemView

    $ yo marionette:itemview view-name --inherit view-name

You can link to an existent template at location templates/[template-location]

    $ yo marionette:itemview view-name --inherit view-name

Or maybe you want to create both, itemView and template on one step

    $ yo marionette:itemview view-name --inherit view-name --create-all



Create collection views
------------
Create a Marionette CollectionView

    $ yo marionette:collectionview view-name

You can link to an existant itemview 

    $ yo marionette:collectionview view-name --itemview itemview-name --inherit view-name

Or maybe you want to create both, itemview and collectionview. In that case you may want to create an itemview template as well

    $ yo  marionette:collectionview view-name --itemview itemview-name --inherit view-name --create-all




Create composite views
------------
Create a Marionette CompositeView

    $ yo marionette:compositeview view-name --itemview itemview-name --inherit view-name

Or maybe you want to create all, itemview and compositeview and both templates. In that case you may want to create an itemview template as well

    $ yo marionette:compositeview view-name --itemview itemview-name --inherit view-name --create-all




Create regions
------------
Create a Marionette Region

    $ yo marionette:region region-name --inherit region-name




Create layouts
------------
Create a Marionette Layout

    $ yo marionette:layout layout-name --inherit layout-name

You can link to an existent template at location templates/[template-location]

    $ yo marionette:layout layout-name --inherit layout-name

Or maybe you want to create both, Layout and template on one step

    $ yo marionette:layout layout-name --inherit layout-name --create-all




Create templates
------------
Create a handle bars tmpl

    $ yo marionette:tmpl tmpl-name --tmplLocation tmpl-location




Testing
-------
Default test framework for this generator is buster.js but you cant specify another like mocha

    $ yo marionette --test-framework=mocha

But if you work with buster you have to do a couple of things first. Due buster framework issues you have to install node 0.9.9, at this time don't work with node 0.10.0 and ensure to install globally buster and plantomjs:

    $ npm install -g buster phantomjs

Instructions to install generator-buster follow this link https://github.com/abiee/generator-buster
