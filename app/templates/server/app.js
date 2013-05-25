'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
<% if(useBaucis){ %>var baucis = require('baucis');<% } %>
<% if(useMongoose){ %>var mongoose = require('mongoose');<% } %>
<% if(useFaye){ %>var faye = require('faye');<% } %>
<% if(useSocketIO){ %>var socketIO = require('socket.io');<% } %>

<% if(useMongoose){ %>
// start mongoose
var db = mongoose.createConnection( 'localhost', 'Products' );
db.once('open', function() {

	// define a schema
	var productSchema = new mongoose.Schema({
		brand: String,
		productCode: String
	});

	// define a model
	var Product = db.model( 'Product', productSchema );

	// create an instance
	var productOne = new Product({ brand: 'Gucci', productCode: '04123123123' });

	// print
	console.dir(productOne);

	// save the instance to the db
	productOne.save();
});
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

