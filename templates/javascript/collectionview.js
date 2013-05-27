(function() {
	'use strict';

	var root = this;

	root.define([
		'backbone'<% if (!_.isEmpty(itemview)) { %>,
		'views/item/<%=itemview%>'<% } %><% if (!_.isEmpty(inherit)) { %>,
		'views/collection/<%= inherit %>'<% } %>
	],
	function( <%=_.classify('backbone')%><% if (!_.isEmpty(itemview)) { %>, <%=_.classify(itemview)%> <% } %><% if (!_.isEmpty(inherit)) { %>, <%=_.classify(inherit)%><% } %> ) {

		/* Return a ItemView class definition */
		return <% if (!_.isEmpty(inherit)) { %><%=_.classify(inherit)%>.extend <% } else { %>Backbone.Marionette.CollectionView.extend<% } %>({
		
			initialize: function() {
				console.log("initialize a <%= _.classify(name) %> CollectionView");
			},
			<% if (!_.isEmpty(itemview)) { %>
	    	itemview: <%= _.classify(itemview) %>,
	    	<% } %>

	    	/* ui selector cache */
	    	ui: {},

			/* Ui events hash */
			events: {},

			/* on render callback */
			onRender: function() {}
		});

	});
}).call( this );
