import {Request, Response, NextFunction} from "express";
import {User, userAttr, UserDoc} from "../models/user";
import admin from "firebase-admin";
import {Jwt} from "../utility/jwt";
/**
 * User signin
 * @param req
 * @param res
 * @param next
 */
const signIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// body
		const {firebaseToken} = req.body;

		// check firebase
		if (!firebaseToken) {
			const error = new Error("Unauthorized access!");
			throw next(error);
		}

		// firebase admin verification
		const firebase = await admin.auth().verifyIdToken(firebaseToken);
		if (!firebase) {
			const error = new Error("Unauthorized access!");
			throw next(error);
		}

		// user is in db or not
		let resultSend: UserDoc;
		const hasUser = await User.findOne({email: firebase.email});
		if (!hasUser) {
			const name = firebase.name.split(" ");
			const user = User.addUser({
				first_name: name[0],
				last_name: name[1],
				username: firebase.name,
				email: firebase.email!,
				photo_url: firebase.picture,
				firebase_uid: firebase.user_id,
				role: 0,
			}) as UserDoc;

			resultSend = await user.save();
		}

		const token = Jwt.tokenGenerate(resultSend!);
		var lExpiresIn = 86400000; // 24 hours in millisecond
		const expire = new Date(Date.now()).getTime() + lExpiresIn;

		return res.send({
			token: token,
			exp: expire,
			...(resultSend! || hasUser),
		});
	} catch (error) {
		next(error);
	}
};

/**
 * User signup
 * @param req
 * @param res
 * @param next
 */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.body);
		res.json({
			message: "success",
		});
	} catch (error) {
		next(error);
	}
};

/**
 * export methods
 */
export {signIn, signUp};
