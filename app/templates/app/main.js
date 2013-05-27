(function() {
    'use strict';

    var root = this;

    root.require([
		'backbone',
		'application',

		/* requires that are just needed before app runs */
		'backbone.marionette',
		'bootstrap',
		'marionette.handlebars'
	],
	function ( Backbone, App ) {
		App.start();
	});
}).call( this );