define([
	'backbone'<% if (!_.isEmpty(inherit)) { %>,
	'models/<%= inherit %>'<% } %>
	],
	function( <%= _.classify('backbone') %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {
        'use strict';

		/* Return a model class definition */
		return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Model.extend<% } %>({
			initialize: function() {
				console.log("initialize a <%= _.classify(name) %> model");
			},

			defaults: {},

	});
});
