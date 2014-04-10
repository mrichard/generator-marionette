define([
	'backbone',
	'controllers/<%= contoller %>'<% if (!_.isEmpty(inherit)) { %>,
	'approuters/<%= inherit %>'<% } %>
],
function(<%= _.classify('backbone') %>, <%=_.classify(contoller)%><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ){
    'use strict';

	return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.AppRouter.extend<% } %>({

		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> AppRouter");
		},

		controller: <%= _.classify(contoller) %>,

		/* Marionette App Routes */
		 appRoutes: {},

		/* Backbone routes hash */
		routes: {}
	});
});

