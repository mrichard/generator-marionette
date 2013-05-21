define ['backbone'], () ->
    <%= _.classify(appname) %> =
        init: () ->
            # initialize router, views, data and layouts
        start: () ->
            <%= _.classify(appname) %>.init()
            Backbone.history.start()
        Views: {}
        Models: {}
        Collections: {}
        Routers: {}

    return <%= _.classify(appname) %>;
