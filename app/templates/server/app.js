'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var socketIO = require('socket.io');
var mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://localhost/sit');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	/* test schema */
    var testSchema = new mongoose.Schema({
        test: String
    });

    var Test = mongoose.model( 'test', testSchema );

    /* set Baucis */
    baucis.rest({
        singular: 'test'
    });

	var app = express();

	app.configure(function(){
	    app.set('port', 9000);

	    app.set('view engine', 'handlebars');
	    app.set('views', path.join( __dirname, '<%= serverToTemplateRelativePath %>' ) );
	});

    app.use('/api/v1', baucis());

	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	//app.use(express.static( path.join( __dirname, '../templates') ));

	// map web root folder
	app.use(express.static( path.join( __dirname, '<%= serverToWebRelativePath %>' ) );
	app.use(express.static( path.join( __dirname, '../.tmp') ) ); //TODO


	// route index.html
	app.get('/', function(req, res){
	  res.sendfile( path.join( __dirname, '<%= serverToWebRelativePath %>', 'index.html' ) );
	});

	// start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	});
});


