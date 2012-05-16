var path = require( 'path' ),
	fs   = require( 'fs' ),
	util = require( 'util' );

var get = exports.get = function( fileName, callback ){
	fileName = __dirname + '/../data/' + fileName + '.json';
	path.exists( fileName, function( exists ){
		if( !exists ){
			return callback( util.format( 'File %s does not exist', fileName ), [] );
		}
		var stream      = fs.createReadStream( fileName ),
			fileContent = '';
		stream.once( 'open', function( fd ){
			stream.on( 'data', function( data ){
				fileContent = fileContent + data;
			});

			stream.on( 'error', function( error ){
				console.log( 'file error: ' + error );
				callback( error, [] );
			});

			stream.on( 'end', function(){
				fileContent = JSON.parse( fileContent );
				fileContent = typeof( fileContent ) != 'object' ? [] : fileContent;
				callback( null, fileContent );
			});
		});
	});
}

exports.set = function( filename, data, callback ){
	fileName = __dirname + '/../data/' + filename + '.json';
	get( filename, function( error, fileContent ){
		for( n in data ){
			data[n] = data[n] == data[n] * 1 ? data[n] * 1 : data[n];
		}
		fileContent.push( data );
		var stream = fs.createWriteStream( fileName );
		stream.once( 'open', function(){
			stream.end( JSON.stringify( fileContent ));
		});

		stream.on( 'error', function( error ){
			console.log( 'file error: ' + error );
			callback( error, [] );
		});

		stream.on( 'close', function(){
			callback( null, fileContent.length - 1 );
		});
	});
}