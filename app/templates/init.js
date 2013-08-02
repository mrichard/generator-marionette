require.config({

    baseUrl: "/scripts",

    /* starting point for application */
    deps: ['main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../<%= bowerDirectory %>/jquery/jquery',
        backbone: '../<%= bowerDirectory %>/backbone-amd/backbone',
        underscore: '../<%= bowerDirectory %>/underscore-amd/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../<%= bowerDirectory %>/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../<%= bowerDirectory %>/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../<%= bowerDirectory %>/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../<%= bowerDirectory %>/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../<%= bowerDirectory %>/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs/json2',
        hbs: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs',

        /* marionette and handlebars plugin */
        'marionette.handlebars': '../<%= bowerDirectory %>/backbone.marionette.handlebars/backbone.marionette.handlebars'
    },

    hbs: {
        disableI18n: true
    }
});
