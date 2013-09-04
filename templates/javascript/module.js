define([
    'application'
], function(app) {

	'use strict';

    return app.module(<%= name %>, function(mod, app) {
        mod.addInitializer(function() {
	        console.log('<%= _.capitalize(name) %> has been initialized.');
        });
    });

});