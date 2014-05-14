var yaml = require('js-yaml');
var fs   = require('fs');
var path = require('path');

/**
 * doc is in the form:
 * doc = {
 *		rootDirectory: {String} // root directory
 *		jsDirectory: {String}
 *		cssDirectory: {String}
 *		imageDirectory: {String}
 *		templateDirectory: {String}
 *		serverDirectory: {String}
 *		bowerDirectory: {String}
 * }
 **/

module.exports = (function(){

	var _directoryData = null;
	var _context = null;

	// reads data from YAML file
	var _readYAML = function(){

		console.log( "*********************** READING YAML *****************" );

		// get file path
		var foldersConfigPath = path.resolve( process.cwd(), '.marionette-generator.yaml');

		// Get document, or throw exception on error
		try {
			_directoryData = yaml.safeLoad( fs.readFileSync( foldersConfigPath, 'utf8' ) );
		} catch (e) {
			console.log(e);
		}
	};

	var _shortHandsDirectories = {
		root: "root",
		js: 'jsDirectory',
		css: 'cssDirectory',
		img: 'imageDirectory',
		tmpl: 'templateDirectory',
		server: 'serverDirectory',
		bower: 'bowerDirectory'
	};


	return {

		// save Json from prompts or get it from YAML file
		loadData: function( data ){
			if( data ) {
				_directoryData = data;
			}
			else {
				_readYAML();
			}
		},

		// store generator _context
		/*store_Context: function( context ) {
			_context = context;
		},*/

		// returns a folder path without root
		getUnitFolderPath: function( fileType ) {
			if( !_directoryData ) {
				_readYAML();
			}

			console.log( "filetype == " + fileType );
			console.log( _directoryData[ _shortHandsDirectories[ fileType ] ] );
			console.log( _directoryData[ _shortHandsDirectories["root"] ] );

			return path.join( _directoryData[ _shortHandsDirectories[ fileType ] ] );
		},

		// returns a folder path with root
		getFullFolderPath: function( fileType, nestedFolder ) {
			if( !_directoryData ) {
				_readYAML();
			}

			nestedFolder = nestedFolder || "";

			if( fileType === 'server' || fileType === 'root' ) {
				return this.getUnitFolderPath( fileType );
			}

			console.log( _directoryData );
			console.log( "getFullFolderPath: " + _directoryData[ _shortHandsDirectories[ fileType ] ] );
			console.log ( "getFullFolderPath: " +  _directoryData[ _shortHandsDirectories["root"] ] );
			return path.join( _directoryData[ _shortHandsDirectories["root"] ], _directoryData[ _shortHandsDirectories[ fileType ] ], nestedFolder );
		},

		// returns all folder JSON
		getAllFolderData: function() {
			return _directoryData;
		},

		// returns a relative path 'from' dir 'to' dir
		getRelativePath: function ( from, to ) {

			var fromPath = path.join( process.cwd(), this.getFullFolderPath( from ) );
			var toPath = path.join( process.cwd(), this.getFullFolderPath( to ) );

			return path.relative( fromPath, toPath );
		}
	};

})();