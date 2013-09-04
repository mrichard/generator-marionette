/*jshint latedef:false */

/**
 * tmpl/index.js
 * Generates view template files in the appropriate directory with
 * the appropriate file extension.
 */

// Preliminaries
var generator = require('yeoman-generator'),
	util = require('util'),
	path = require('path'),
	validDir = require('../helpers/validateDirectory'),
	_ = require('underscore.string/dist/underscore.string.min');

// Export our Generator
module.exports = Generator;

// Our Generator
function Generator() {

	// Used for file naming convention
	var startsWithDash;

	// Apply generator named base
	generator.NamedBase.apply(this, arguments);

	// Set the root path for this generator
	this.sourceRoot(path.join(__dirname, '../templates/javascript'));

	// Require the `template location` variable
	this.argument('tmplLocation', { type: String, required: false });

	// File Extension variable
	this.argument('fileExtension', {
		type: String, default: '.hbs', required: false});

	// Set template location so that it is not null
	this.tmplLocation = this.tmplLocation ? this.tmplLocation : '';

	// Make sure the file extension has a value
	this.fileExtension = this.fileExtension || '.hbs';

	// `File name` value
	// Force dash separated naming convention for view template files.

	// Contains dashes
	if (!/\-+/.test(this.name)) {
		this.name = _.dasherize(this.name);

		// Make sure dasherize doesn't generate dash in first position
		if (/^\-/.test(this.name)) {
			startsWithDash = true;
			do {
				if (!/^\-/.test(this.name)) {
					startsWithDash = false;
				}
				else {
					this.name = this.name.substr(1, this.name.length);
				}
			}
			while (startsWithDash);
		}
	}
}

// Inheirt generator `Named Base`
util.inherits(Generator, generator.NamedBase);

// Create template files callback
Generator.prototype.createTmplFiles = function createTmplFiles() {
	var baseDir = validDir.getValidatedFolder('app/');
	this.template('tmpl.js', path.join(baseDir + 'templates',
		this.tmplLocation, this.name + this.fileExtension));
};
