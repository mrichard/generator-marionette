'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');

var app = express();


app.configure(function(){
    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});

