(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'<% if (!_.isEmpty(inherit)) { %>,
		'controllers/<%= inherit %>'<% } %>
	],
	function( <%= _.classify('backbone') %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {

		return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.Controller.extend<% } %>({
		
			initialize: function( options ) {
				console.log("initialize a <%= _.classify(name) %> Controller");
			}
		});

	});
}).call( this );