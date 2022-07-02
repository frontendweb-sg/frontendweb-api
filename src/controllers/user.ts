import admin from "firebase-admin";
import {Request, Response, NextFunction} from "express";
import {User, UserDoc} from "../models/user";
import {IRole, Jwt} from "../utility";
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

		var lExpiresIn = 86400000; // 24 hours in millisecond
		const expire = new Date(Date.now()).getTime() + lExpiresIn;

		// if user
		const hasUser = (await User.findOne({email: firebase.email})) as UserDoc;
		if (hasUser) {
			const token = Jwt.tokenGenerate(hasUser!);
			return res.send({
				token,
				exp: expire,
				user: hasUser,
			});
		}

		const name = firebase.name.split(" ");
		const user = User.addUser({
			first_name: name[0],
			last_name: name[1],
			username: firebase.name,
			email: firebase.email!,
			photo_url: firebase.picture,
			firebase_uid: firebase.user_id,
			active: true,
			role: IRole.user,
			country: "India",
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		}) as UserDoc;
		const result = await user.save();
		const token = Jwt.tokenGenerate(result);
		return res.send({
			token,
			exp: expire,
			user: result,
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

const signInEmail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {firebaseToken} = req.body;
	} catch (error) {
		next(error);
	}
};
/**
 * export methods
 */
export {signIn, signUp, signInEmail};
