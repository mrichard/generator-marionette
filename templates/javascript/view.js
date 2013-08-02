'use strict';

define([
	'backbone'
],
function(<%= _.classify('backbone') %>){
	return Backbone.View.extend({
		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> View");
		}
	});
});
