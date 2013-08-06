define([
	'backbone'<% if (!_.isEmpty(model)) { %>,
	'models/<%= model %>'<% } %><% if (!_.isEmpty(inherit)) { %>,
	'collections/<%= inherit %>'<% } %>
	],
	function( <%=_.classify('backbone')%><% if (!_.isEmpty(model)) { %>, <%=_.classify(model)%><% } %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {
        'use strict';

		/* Return a collection class definition */
		return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Collection.extend<% } %>({
			initialize: function() {
				console.log("initialize a <%= _.classify(name) %> collection");
			}<% if (!_.isEmpty(model)) { %>,

    		model: <%= _.classify(model) %>
    		<% } %>
  		});
});
