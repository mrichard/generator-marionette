var mongoose = require('mongoose');

var database;

module.exports = {
	createDB: function( dbName ) {
		database = mongoose.createConnection( 'localhost', dbName );
		return database;
	},

	testDB: function() {
		database.once('open', function() {

			// define a schema
			var productSchema = new mongoose.Schema({
				brand: String,
				productCode: String
			});

			// define a model
			var Product = database.model( 'Product', productSchema );

			// create an instance
			var productOne = new Product({ brand: 'Gucci', productCode: '04123123123' });

			// print
			console.dir(productOne);

			// save the instance to the db
			productOne.save();
		});
	}
};