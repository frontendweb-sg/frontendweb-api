import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";
import { User, IUserDoc } from "../models/user";
import { ERole, Jwt, Password } from "../utility";
import { BadRequestError } from "../errors";
import { getAuth } from "firebase-admin/auth";
/**
 *
 * @param req
 * @param res
 * @param next
 */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { first_name, last_name, email, password, mobile, role } = req.body;

		const isUser = await User.findOne({ email });
		if (isUser) {
			throw new BadRequestError("User already registered!");
		}

		// const isFbUser = await getAuth().getUserByEmail(email);
		// console.log("is", isFbUser);
		// if (isFbUser) {
		// 	throw new BadRequestError("User already registered!");
		// }

		const displayName = first_name + " " + last_name;
		const fbUser = await getAuth().createUser({
			email,
			emailVerified: true,
			password,
			displayName,
			photoURL: "http://www.example.com/12345678/photo.png",
			disabled: false,
		});

		const user = User.addUser({
			first_name,
			last_name,
			username: displayName,
			email,
			password: Password.toHash(password),
			mobile,
			role: role,
			firebase_uid: fbUser.uid,
			photo_url: fbUser.photoURL,
			active: true,
		});

		const result = await user.save();
		return res.status(201).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * User signin
 * @param req
 * @param res
 * @param next
 */
const signIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// body
		const { firebaseToken } = req.body;

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
		const hasUser = (await User.findOne({ email: firebase.email })) as IUserDoc;
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
			role: ERole.user,
		}) as IUserDoc;

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

const signInWithEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;

		const isUser = (await User.findOne({ email })) as IUserDoc;
	} catch (error) {
		next(error);
	}
};
/**
 * export methods
 */
export { signIn, signUp, signInWithEmail };
