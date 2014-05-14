require.config({

    baseUrl: "<%= jsDirectory %>",

    /* starting point for application */
    deps: ['backbone.marionette', 'bootstrap', 'main'],


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
        jquery: '<%= jsToBowerRelativePath %>/jquery/dist/jquery.min',
        backbone: '<%= jsToBowerRelativePath %>/backbone/backbone',
        underscore: '<%= jsToBowerRelativePath %>/underscore/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '<%= jsToBowerRelativePath %>/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '<%= jsToBowerRelativePath %>/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '<%= jsToBowerRelativePath %>/backbone.babysitter/lib/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '<%= jsToBowerRelativePath %>/requirejs-text/text',
        tmpl: "<%= jsToTemplateRelativePath %>",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '<%= jsToBowerRelativePath %>/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '<%= jsToBowerRelativePath %>/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '<%= jsToBowerRelativePath %>/require-handlebars-plugin/hbs/json2',
        hbs: '<%= jsToBowerRelativePath %>/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true
    }
});
