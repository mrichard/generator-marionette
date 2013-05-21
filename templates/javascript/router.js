define(['<%= _.slugify(appname) %>'], function(<%= _.classify(appname) %>){
  var <%= _.classify(name) %>Router = Backbone.Router.extend({

  });

  <%= _.classify(appname) %>.Routers.<%= _.classify(name) %>Router = <%= _.classify(name) %>Router;
  return <%= _.classify(name) %>Router;
});
