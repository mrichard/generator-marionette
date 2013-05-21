define ['<%= _.slugify(appname) %>'], (<%= _.classify(appname) %>) ->
  class <%= _.classify(name) %>Model extends Backbone.Model

  <%= _.classify(appname) %>.Models.<%= _.classify(name) %>Model = <%= _.classify(name) %>Model
  return <%= _.classify(name) %>Model
