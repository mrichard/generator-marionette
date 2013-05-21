define ['<%= _.slugify(appname) %>'], (<%= _.classify(appname) %>) ->
  class <%= _.classify(name) %>Router extends Backbone.Router

  <%= _.classify(appname) %>.Routers.<%= _.classify(name) %>Router = <%= _.classify(name) %>Router
  return <%= _.classify(name) %>Router
