import {CustomError} from "./custom-error";
import {ValidationError} from "express-validator";

// Request validation error
class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = "Error connecting to database!";
	constructor() {
		super("Error connecting to db");
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
	errorSerialize() {
		return [{message: this.reason}];
	}
}

export {DatabaseConnectionError};
