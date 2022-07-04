import {NextFunction, Request, Response} from "express";
import {AuthenticationError, BadRequestError} from "../errors";
import {User, UserDoc} from "../models/user";

// authentication
const admin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = (await User.findById(req.currentUser.id)) as UserDoc;
		if (user.role !== "admin") {
			throw new BadRequestError(
				"Only admin have permission to perform this action!"
			);
		}
		next();
	} catch (err) {
		throw next(err);
	}
};

export {admin};
