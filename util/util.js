var path = require( "path" ),
	fs   = require( "fs" );

var util = module.exports = {
	check : function( name, callback ){
		callback = typeof( callback ) == function ? callback : function(){};
		path.exists( __dirname + '../controller/' + name + '.js', function( exists ){
			if( !exists ) return callback( true, null );
			return callback( null, true );
		});
	}
}