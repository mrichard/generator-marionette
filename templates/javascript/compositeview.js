define([
	'backbone'<% if (!_.isEmpty(itemview)) { %>,
	'views/item/<%=itemview%>'<% } %><% if (!_.isEmpty(compTmpl)) { %>,
	'hbs!tmpl/<% if (!_.isEmpty(compTmplLocation)) { %><%= compTmplLocation%>/<% } %><%= compTmpl %>'<% } %><% if (!_.isEmpty(inherit)) { %>,
	'views/composite/<%= inherit %>'<% } %>
],
function( <%= _.classify('backbone')%><% if (!_.isEmpty(itemview)) { %>, <%=_.classify(itemview)%><% } %><% if (!_.isEmpty(compTmpl)) { %>, <%= _.classify(compTmpl)%> <% } %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {
    'use strict';

	/* Return a CompositeView class definition */
	return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.CompositeView.extend<% } %>({

		initialize: function() {
			console.log("initialize a <%= _.classify(name) %> CompositeView");
		},
		<% if (!_.isEmpty(itemview)) { %>
    	itemView: <%= _.classify(itemview) %>,<% } %>
    	<% if (!_.isEmpty(compTmpl)) { %>
    	template: {
			type: 'handlebars',
			template: <%= _.classify(compTmpl) %>
		},
    	<% } %>

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
