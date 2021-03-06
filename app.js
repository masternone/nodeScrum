/**
 * Module dependencies.
 */
var express = require( 'express' ),
	routes  = require( './routes/routes' );

var app = module.exports = express.createServer();

// Configuration
app.configure( function(){
	app.set( 'views', __dirname + '/views' );
	app.set( 'view engine', 'ejs' );
	app.use( express.logger());
	app.use( express.cookieParser());
	app.use( express.bodyParser());
	app.use( express.methodOverride());
	app.use( express.session({ secret: 'keyboard cat' })); // this should be moved in to a env var
	app.use( express.static( __dirname + '/public' ));
	app.use( app.router );
});

app.configure( 'development', function(){
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure( 'production', function(){
  app.use( express.errorHandler());
});

// Routes
app.get( '/', routes.index );
app.get( '/:controller', function( req, res, next ){
	routes[req.params.controller].index( req, res );
});
app.get( '/:controller/:id', function( req, res, next ){ // show
	if( isNaN( req.params.id ) ) return next();
	routes[req.params.controller].show( req, res, req.params.id );
});
app.get( '/:controller/new', function( req, res, next ){ // new
	routes[req.params.controller]['new']( req, res );
});
app.post( '/:controller', function( req, res, next ){ // create
	routes[req.params.controller].create( req, res );
});
app.get( '/:controller/edit/:id', function( req, res, next ){ // edit
	if( isNaN( req.params.id ) ) return next();
	routes[req.params.controller].edit( req, res, req.params.id );
});
app.put( '/:controller/:id', function( req, res, next ){ // update
	if( isNaN( req.params.id ) ) return next();
	routes[req.params.controller].update( req, res, req.params.id );
});
app.delete( '/:controller/:id', function( req, res, next ){ // destroy
	if( isNaN( req.params.id ) ) return next();
	routes[req.params.controller].destroy( req, res, req.params.id );
});

var port = process.env.PORT || 8888,
	host = process.env.HOST || 'localhost';

app.listen( port, function(){
  console.log( "Express server listening on port %d in %s mode", app.address().port, app.settings.env );
});