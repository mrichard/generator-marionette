define ['<%= _.slugify(appname) %>', 'jquery', 'bootstrap'], (<%= _.classify(appname) %>, $) ->
    <%= _.classify(appname) %>.start()
