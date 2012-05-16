var data   = require( '../util/data' ),
	linkTo = require( '../util/linkTo' );

var dataAreas = ['productBacklog', 'sprintBacklog'];

/*
 * GET root
 */
exports.index = function( req, res ){
	var sidebar = [];
	for( n in dataAreas ){
		sidebar.push({
			link : linkTo.linkTo( dataAreas[n], 'index', 0 ),
			text : linkTo.linkToText( dataAreas[n], 'index', 0 )
		});
	}
	res.render( 'index', { title : 'Home', sidebar : sidebar });
};

/*
 * The object that defines the actions for each controller have been moved to a seperate file for each
 * controller.
 */
exports.productBacklog  = require( './productBacklog' ).productBacklog( data, linkTo );
//exports.sprintBacklog   = require( './sprintBacklog'  ).sprintBacklog(  linkTo );
