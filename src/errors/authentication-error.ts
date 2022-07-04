import {CustomError} from "./custom-error";

// Bad request error
class AuthenticationError extends CustomError {
	statusCode = 401;
	constructor(public message: string = "Not Authorized") {
		super("Not authorized");
		Object.setPrototypeOf(this, AuthenticationError.prototype);
	}
	errorSerialize() {
		return [{message: this.message}];
	}
}

export {AuthenticationError};
