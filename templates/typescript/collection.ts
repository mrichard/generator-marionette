/// <reference path="../../../bower_components/DefinitelyTyped/underscore/underscore.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/backbone/backbone.d.ts"/>
<% if (!_.isEmpty(model)) { %>
/// <reference path="../model/<%= model %>.ts"/>
<% } %><% if (!_.isEmpty(inherit)) { %>/// <reference path="./<%= inherit %>.ts"/>
<% } %>
/**
 * @namespace <%= _.classify(appName) %>.Collection
 */
module <%= _.classify(appName) %> {
  module Collection {
    /**
     * @class <%= _.classify(name) %>
     * @extends <%= _.isEmpty(inherit) ? 'Backbone.Collection' : _.classify(inherit) %>
     * @constructor
     * @param {any} opts
     */
    export class <%= _.classify(name) %> extends <% if (!_.isEmpty(inherit)) { %><%= _.classify(inherit) %><% } else { %>Backbone.Collection<% } %> {
      <% if (!_.isEmpty(model)) { %>/**
       * <%= _.classify(model) %> Model
       * @type <%= _.classify(model) %>
       * @property model
       */
      private model: <%= _.classify(model) %> = <%= _.classify(model) %>;

      <% } %>/**
       * @constructor
       * @param {any} opts
       */
      initialize(opts) {
        console.log("DEBUG: initialize a <%= _.classify(name) %> Collection");
      }
    }
  }
}
