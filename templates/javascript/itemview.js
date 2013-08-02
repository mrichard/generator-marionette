define([
	'backbone'<% if (!_.isEmpty(tmpl)) { %>,
	'hbs!tmpl/<% if (!_.isEmpty(tmplLocation)) { %><%= tmplLocation%>/<% } %><%= tmpl %>'<% } %><% if (!_.isEmpty(inherit)) { %>,
	'views/item/<%= inherit %>'<% } %>
],
function( <%= _.classify('backbone') %><% if (!_.isEmpty(tmpl)) { %>, <%= _.classify(tmpl) %> <% } %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {
    'use strict';

	/* Return a ItemView class definition */
	return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.ItemView.extend<% } %>({

		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> ItemView");
		},
		<% if (!_.isEmpty(tmpl)) { %>
    	template: {
			type: 'handlebars',
			template: <%= _.classify(tmpl) %>
		},<% } %>

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
