'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
<% if(useBaucis){ %>var baucis = require('baucis');<% } %>
<% if(useFaye){ %>var faye = require('faye');<% } %>
<% if(useSocketIO){ %>var socketIO = require('socket.io');<% } %>


<% if(useMongoose){ %>
// start mongoose
var mongooseSetup = require('./mongooseInit');
mongooseSetup.createDB( 'Products' );
mongooseSetup.testDB();
<% } %>

// init express
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));


// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});

// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});

