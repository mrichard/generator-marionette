define(['<%= _.slugify(appname) %>'], function(<%= _.classify(appname) %>){
  var <%= _.classify(name) %>View = Backbone.View.extend({
    render: function () {
      $(this.el).html("<h1>Hello world</h1>");
      return this;
    }
  });

  <%= _.classify(appname) %>.Views.<%= _.classify(name) %>View = <%= _.classify(name) %>View;
  return <%= _.classify(name) %>View;
});
