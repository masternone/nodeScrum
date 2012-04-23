var http = require( 'http' ),
	url  = require( 'url' );
	bl   = require( 'beeline' ),
	util = require( './util/util' );

var controler = {};

var call = function( req, res, fnc, name, id, parms ){
	return util.check( name, function( error, exists ){ 
		if( error ) return router.missing(req, res, this); // Calls the 404 (aka missing) handler
		if( typeof( controller[name] ) != 'object' ){
			controller[name] = require( './controler/' + name );
		}
		if( typeof( controller[name][fnc] ) != 'function' ){
			return router.missing(req, res, this); // Calls the 404 (aka missing) handler
		}
		return controller[name][fnc]( req, res, name, id, parms );
	});
}

var router = bl.route({ // Create a new router
	'/' : function(req, res, tokens, values){
		//console.log( 'arguments', arguments );
		console.log( url.parse(req.url).query );
		res.writeHead( 200, { "Content-Type" : "text/plain" });
		res.write( JSON.stringify({ url : req.url }));
		res.write( JSON.stringify({ tokens : tokens }));
		res.write( JSON.stringify({ values : values }));
		res.end();
	},
	'/`name`' : function( req, res, tokens, values ){
		'GET' : function( req, res, tokens, values ){ // index
			return call( req, res, 'index', tokens['name'] );
		}
	},
	'/`name`/`id`' : function( req, res, tokens, values ){
		'GET'    : function( req, res, tokens, values ){ // show
			return call( req, res, 'show', tokens['name'], tokens['id'] );
		},
		'PUT'    : function( req, res, tokens, values ){ // update
			return call( req, res, 'update', tokens['name'], tokens['id'], url.parse(req.url).query );
		},
		'DELETE' : function( req, res, tokens, values ){ // destroy
			return call( req, res, 'destroy', tokens['name'], tokens['id'] );
		},
		'any'    : function( req, res, tokens, values ){ 
			switch( url.parse(req.url).query["METHOD"] ){
				case 'PUT': // update
					return call( req, res, 'update', tokens['name'], tokens['id'], url.parse(req.url).query );
					break;
				case 'DELETE': // destroy
					return call( req, res, 'destroy', tokens['name'], tokens['id'] );
					break;
			}
		}
	},
	'/`name`/new' : function( req, res, tokens, values ){
		'GET' : function( req, res, tokens, values ){ // new
			return call( req, res, 'new', tokens['name'] );
		}
	},
	'/`name`/`id`/edit' : function( req, res, tokens, values ){
		'GET' : function( req, res, tokens, values ){
			return call( req, res, 'edit', tokens['name'], tokens['id'] );
		}
	}
});

http.createServer( router ).listen( 8888 ); // Starts serve with routes defined above