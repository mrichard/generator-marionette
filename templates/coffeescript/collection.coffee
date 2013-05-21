define ['<%= _.slugify(appname) %>'<% if (!_.isEmpty(model)) { %>, 'models/<%= model %>-model'<% } %>], (<%= _.classify(appname) %>) ->
  class <%= _.classify(name) %>Collection extends Backbone.Collection
    <% if (!_.isEmpty(model)) { %>model: <%= _.classify(appname) %>.Models.<%= _.classify(model) %>Model<% } %>

  <%= _.classify(appname) %>.Collections.<%= _.classify(name) %>Collection = <%= _.classify(name) %>Collection
  return <%= _.classify(name) %>Collection
