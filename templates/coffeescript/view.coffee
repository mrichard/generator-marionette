define ['<%= _.slugify(appname) %>'], (<%= _.classify(appname) %>) ->
  class <%= _.classify(name) %>View extends Backbone.View
    render: () ->
      $(this.el).html("<h1>Hello world</h1>")

  <%= _.classify(appname) %>.Views.<%= _.classify(name) %>View = <%= _.classify(name) %>View
  return <%= _.classify(name) %>View
