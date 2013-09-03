/**
 * yo-marionette-config.js
 *
 * The idea is to have a config file from which to read the folder structure of the 
 * application from that should be used when generating files through the generator
 * instead of having it hardcoded in the generators.  This file is also a good place
 * to keep file generation options as well.
 *
 * Possible actions to create to go along with the yo-marionette-config.js:
 * ----------------------------------------------------------------------------
 * yo marionette:refresh-test-suite (only test with existing files should be listed to run)
 * tentative - yo marionette:process-config 
 * yo marionette:use-config config-file-name (default yo-marionette-config.js)
 *
 * @author elydelacruz
 */

// Modular config
({
	isFullApp: false,
	useMongoose: false,
	useBaucis: false,
	bowerDirectory: 'bower_components',

	// Legacy
	compassBootstrap: true,
	includeRequireJS: true,

	/**
	 * Additions
	 */
	isModularApp: false,
	application: {
		dirName: 'app'
	},
	module: {
		dirName: 'modules',
		classSuffix: 'Module' 
	},
	controller: {
		dirName: 'controllers',
		classSuffix: 'Controller'
	},
	view: {
		dirName: 'views',
		classSuffix: 'View',
		
		//=====================================================================
		// Tentative
		//=====================================================================
		/**
		 * Nest view types upon generation;  I.e., yo marionette:composite-view FileName
		 *  Generates "views/FileNameCompositeView.js" if `nestViewTypes` is set to true else
		 *  "views/FileNameView.js"
		 * @type boolean
		 */
		nestViewTypes: false,
		
		/**
		 * Use the nested view config's suffix attribute when generating view files
		 * @type boolean
		 */
		useNestedViewsSuffix: false,
		
		/**
		 * This section is used for nesting view types in their appropriate folder
		 * if the 'nest view types' (nestViewTypes) variable is set to true.
		 *** Note ***
		 * If 'nest view types' is set to true the 'class suffix' (classSuffix) 
		 * is appended before the before the view.classSuffix (which defaults to 'View'); I.e.,
		 * @type object
		 */
		nestedView: {
			compositeView: {
				dirName: 'composite-views',
				classSuffix: 'Composite'
			},
			itemView: {
				dirName: 'item-views',
				classSuffix: 'Item'
			}
		}
		//=====================================================================
		// End of Tentaive
		//=====================================================================
		
	},
	viewTemplate: {
		dirName: 'view-templates',
		templateSuffix: '-view',
		templateExtension: '.html'
	},
	collection: {
		dirName: 'collections',
		classSuffix: 'Collection'
	},
	model: {
		dirName: 'models',
		classSuffix: 'Model'
	}
});