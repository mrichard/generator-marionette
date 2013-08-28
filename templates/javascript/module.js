define([
    'application'
], function(app) {
    app.module(<%= name %>, function(mod, app) {
        mod.addInitializer(function() {
	        console.log('<%= _.capitalize(name) %> has been initialized.');
        });
    });
});