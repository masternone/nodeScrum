exports.productBacklog = function( data, linkTo ){
	return{
		/*
		* productBacklog Index.
		*/
		index : function( req, res ){
			data.get( 'productBacklog', function( error, productBacklog ){
				res.render( 'productBacklog/index', { 
					title : 'Product Backlog Index',
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
					title : 'Product Backlog Item',
					linkTo_productBacklogIndex     : linkTo.linkTo(     'productBacklog', 'index', null ),
					linkTo_productBacklogIndexText : linkTo.linkToText( 'productBacklog', 'index', null )
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
						productBacklog : {},
						title : 'New Product Backlog Item'
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
					res.redirect( linkTo.linkTo( 'productBacklog', 'show', id  ));
				}
			});
		},
		/**
		 * productBacklog Edit.
		**/
		edit : function( req, res, id ){
			data.get( 'productBacklog', function( error, productBacklog ){
				if( error ) console.log( error );
				data.get( 'status', function( error, status ){
					if( error ) console.log( error );
					data.get( 'theme', function( error, theme ){
						if( error ) console.log( error );
						productBacklog[id].id = id;
						res.render( 'productBacklog/edit', {
							flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
							form : {
								action : linkTo.linkTo( 'productBacklog', 'update', id ),
								method : 'PUT',
								name   : 'newProductBacklog',
								submit : linkTo.linkToText( 'productBacklog', 'update', id )
							},
							theme : theme,
							status : status,
							productBacklog : productBacklog[id],
							title : 'Edit Product Backlog Item'
						});
					});
				});
			});
		 },
		/**
		 * productBacklog Update.
		**/
		update : function( req, res ){
			data.set( 'productBacklog', req.body, function( error, id ){
				if( error ){
					console.log( error );
					res.redirect( 'back' );
				}
				if( !isNaN( id )){
					res.redirect( linkTo.linkTo( 'productBacklog', 'show', id  ));
				}
			});
		}
		/*
		* productBacklog Destroy.
		*/
	}
}