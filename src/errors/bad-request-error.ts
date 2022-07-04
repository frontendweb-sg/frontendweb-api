import {CustomError} from "./custom-error";

// Bad request error
class BadRequestError extends CustomError {
	statusCode = 400;
	constructor(public message: string) {
		super(message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	errorSerialize() {
		return [{message: this.message}];
	}
}

export {BadRequestError};
