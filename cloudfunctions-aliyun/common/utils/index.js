const base64Arraybuffer = require('base64-arraybuffer')

function encodeBuffer( buffer ) {
		return base64Arraybuffer.encode(buffer);
}

function decodeString( str ) {
	return base64Arraybuffer.decode( str );
}

function getVersion() {
	return '1.0.0'
}

module.exports = {
	encodeBuffer,
	decodeString,
	getVersion
}