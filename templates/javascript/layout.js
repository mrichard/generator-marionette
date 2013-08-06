define([
	'backbone'<% if (!_.isEmpty(tmpl)) { %>,
	'hbs!tmpl/<% if (!_.isEmpty(tmplLocation)) { %><%= tmplLocation%>/<% } %><%= tmpl %>'<% } %><% if (!_.isEmpty(inherit)) { %>,
	'views/layout/<%= inherit %>'<% } %>
],
function( <%= _.classify('backbone') %><% if (!_.isEmpty(tmpl)) { %>, <%= _.classify(tmpl) %> <% } %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {
    'use strict';

	/* Return a Layout class definition */
	return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.Layout.extend<% } %>({

		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> Layout");
		},
		<% if (!_.isEmpty(tmpl)) { %>
    	template: {
			type: 'handlebars',
			template: <%= _.classify(tmpl) %>
		},
    	<% } %>

    	/* Layout sub regions */
    	regions: {},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
