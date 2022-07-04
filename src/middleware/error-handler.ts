import {Request, Response, NextFunction} from "express";
import {CustomError} from "../errors/custom-error";
// error handler
const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("err", error);
	if (error instanceof CustomError) {
		return res.status(error.statusCode).send({errors: error.errorSerialize()});
	}

	res.send({
		error: "Something went wrong",
	});
};

export {errorHandler};
