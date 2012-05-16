exports.productBacklog = function( data, linkTo ){
	return{
		/*
		 * productBacklog Index.
		 */
		index : function( req, res ){
			data.get( 'productBacklog', function( error, productBacklog ){
				res.render( 'productBacklog/index', { 
					title : 'Product Backlog index',
					productBacklog : productBacklog,
					linkTo_productBacklogNew     : linkTo.linkTo(     'productBacklog', 'new', null ),
					linkTo_productBacklogNewText : linkTo.linkToText( 'productBacklog', 'new', null )
				});
			});
		},
		/*
		 * productBacklog Show.
		 */
		 show : function( req, res, id ){
			data.get( 'productBacklog', function( error, productBacklog ){
				res.render( 'productBacklog/show', {
					flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
					productBacklog : [productBacklog[id]],
					title : 'productBacklog'
				});
			});
		 },
		/*
		 * productBacklog New.
		 */
		'new' : function( req, res, flash ){
			data.get( 'status', function( error, status ){
				if( error ) console.log( error );
				data.get( 'theme', function( error, theme ){
					if( error ) console.log( error );
					res.render( 'productBacklog/new', {
						flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
						form : {
							action : linkTo.linkTo( 'productBacklog', 'create', null ),
							method : 'POST',
							name   : 'newProductBacklog',
							submit : linkTo.linkToText( 'productBacklog', 'create', null )
						},
						theme : theme,
						status : status,
						productBacklog : [],
						title : 'New Product Backlog'
					});
				});
			});
		},
		/*
		 * productBacklog Create.
		 */
		create : function( req, res ){
			// console.log( 'req.body', req.body );
			data.set( 'productBacklog', req.body, function( error, id ){
				if( error ){
					console.log( error );
					res.redirect( 'back' );
				}
				if( !isNaN( id )){
					res.redirect( '/productBacklog/' + id );
				}
			});
		}
		/*
		 * productBacklog Edit.
		 */
		/*
		 * productBacklog Update.
		 */
		/*
		 * productBacklog Destroy.
		 */
	}
}