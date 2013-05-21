define(['<%= _.slugify(appname) %>', 'jquery', 'bootstrap'], function(<%= _.classify(appname) %>, $){
    <%= _.classify(appname) %>.start();
});
