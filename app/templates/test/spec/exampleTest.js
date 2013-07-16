(function() {
	'use strict';

	var root = this;

	root.define( function() {

		describe('Give it some context', function () {
			it('should have true equal true', function () {
				expect( true ).to.equal( true );
			});
		});

	});

}).call( this );
