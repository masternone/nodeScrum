exports.teamMembers = function( data, linkTo ){
	return{
		/*
		* teamMembers Index.
		*/
		index : function( req, res ){
			data.get( 'teamMembers', function( error, teamMembers ){
				res.render( 'teamMembers/index', { 
					title : 'Team Members Index',
					teamMembers : teamMembers,
					linkTo_teamMembersNew     : linkTo.linkTo(     'teamMembers', 'new', null ),
					linkTo_teamMembersNewText : linkTo.linkToText( 'teamMembers', 'new', null )
				});
			});
		},
		/*
		* teamMembers Show.
		*/
		show : function( req, res, id ){
			data.get( 'teamMembers', function( error, teamMembers ){
				res.render( 'teamMembers/show', {
					flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
					teamMembers : [teamMembers[id]],
					title : 'Team Member',
					linkTo_teamMembersIndex     : linkTo.linkTo(     'teamMembers', 'index', null ),
					linkTo_teamMembersIndexText : linkTo.linkToText( 'teamMembers', 'index', null )
				});
			});
		 },
		/*
		* teamMembers New.
		*/
		'new' : function( req, res, flash ){
			res.render( 'teamMembers/new', {
				flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
				form : {
					action : linkTo.linkTo( 'teamMembers', 'create', null ),
					method : 'POST',
					name   : 'newteamMembers',
					submit : linkTo.linkToText( 'teamMembers', 'create', null )
				},
				theme : theme,
				status : status,
				teamMembers : {},
				title : 'New Team Member'
			});
		},
		/*
		* teamMembers Create.
		*/
		create : function( req, res ){
			// console.log( 'req.body', req.body );
			data.set( 'teamMembers', req.body, function( error, id ){
				if( error ){
					console.log( error );
					res.redirect( 'back' );
				}
				if( !isNaN( id )){
					res.redirect( linkTo.linkTo( 'teamMembers', 'show', id  ));
				}
			});
		},
		/**
		 * teamMembers Edit.
		**/
		edit : function( req, res, id ){
			data.get( 'teamMembers', function( error, teamMembers ){
				if( error ) console.log( error );
					teamMembers[id].id = id;
					res.render( 'teamMembers/edit', {
					flash : ( typeof( flash ) == 'string' && flash.length > 0 ? flash : '' ),
					form : {
						action : linkTo.linkTo( 'teamMembers', 'update', id ),
						method : 'PUT',
						name   : 'newteamMembers',
						submit : linkTo.linkToText( 'teamMembers', 'update', id )
					},
					teamMembers : teamMembers[id],
					title : 'Edit Product Backlog Item'
				});
			});
		 },
		/**
		 * teamMembers Update.
		**/
		update : function( req, res ){
			data.set( 'teamMembers', req.body, function( error, id ){
				if( error ){
					console.log( error );
					res.redirect( 'back' );
				}
				if( !isNaN( id )){
					res.redirect( linkTo.linkTo( 'teamMembers', 'show', id  ));
				}
			});
		}
		/*
		* teamMembers Destroy.
		*/
	}
}