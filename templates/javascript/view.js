define([
	'backbone'
],
function(<%= _.classify('backbone') %>){
    'use strict';

	return Backbone.View.extend({
		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> View");
		}
	});
});
