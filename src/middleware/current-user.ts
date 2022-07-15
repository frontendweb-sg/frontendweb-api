import { Request, Response, NextFunction } from "express";
import { Jwt } from "../utility";
import { AuthenticationError } from "../errors";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
	const header = req.get("Authorization");

	// header
	if (!header) {
		throw new AuthenticationError();
	}

	// get token
	const token = header.split(" ")[1];

	let verify = null;
	try {
		verify = Jwt.verify(token) as UserPayload;
	} catch (err) {
		throw new AuthenticationError();
	}

	req.user = verify;

	if (!verify) {
		throw new AuthenticationError();
	}
	// assign logged in user value
	next();
};

export { currentUser };
