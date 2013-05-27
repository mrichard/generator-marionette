(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone',
		'communicator',
		'hbs!tmpl/welcome'
	],

	function( Backbone, Communicator, Welcome_tmpl ) {
		console.log("application.js setup");

		var welcomeTmpl = Welcome_tmpl;

		var App = new Backbone.Marionette.Application();

		/* Add application regions here */
		App.addRegions({});

		/* Add initializers here */
		App.addInitializer( function () {
			console.log("Marionette AMD application has started");
			document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		});

		return App;
	});
}).call( this );