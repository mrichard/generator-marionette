(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'
		], 
		function(<%= _.classify('backbone') %>){

			return Backbone.Router.extend({
				/* Backbone routes hash */
				routes: {}
	  		});
	});
}).call( this );
