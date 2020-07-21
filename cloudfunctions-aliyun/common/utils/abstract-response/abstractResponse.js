class AbstractResponse {
	constructor(code, data, errMessage) {
	    this.code = code,
		this.errMessage = errMessage,
		this.data = data
	}
	
	getCode() {
		return this.code
	}
	
	getErrMessage() {
		return this.errMessage
	}
	
	getData() {
		return this.getData
	}
}

module.exports = {
	AbstractResponse
}