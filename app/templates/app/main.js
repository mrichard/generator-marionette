require([
    'backbone',
    'application',

    /* requires that are just needed before app runs */
    'backbone.marionette',
    'bootstrap',
    'marionette.handlebars'
],

function ( Backbone, App ) {
	'use strict';

	App.start();
});