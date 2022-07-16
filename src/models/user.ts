import mongoose, { Document, Model, Schema } from "mongoose";
import { ERole } from "../utility";

const USER_TABLE_NAME = "user";
interface IUser {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password?: string;
	mobile?: string;
	photo_url?: string;
	firebase_uid?: string;
	role?: ERole;
	active?: boolean;
}

interface IUserDoc extends IUser, Document<IUser> {}

interface IUserModel extends IUser, Model<IUserDoc> {
	addUser(user: IUser): IUserDoc;
}

const schema = new mongoose.Schema(
	{
		first_name: { type: String, require: true },
		last_name: { type: String, require: true },
		username: { type: String, require: true },
		email: { type: String, unique: true },
		password: { type: String },
		mobile: { type: String, default: "" },
		photo_url: { type: String },
		role: { type: String, default: "student", enum: ERole },
		firebase_uid: { type: String, require: true },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, _ret) {
				delete _ret.password;
				delete _ret.__v;
			},
		},
	}
);

schema.statics.addUser = (user: IUser) => {
	return new User(user);
};

const User = mongoose.model<IUserDoc, IUserModel>(USER_TABLE_NAME, schema);

export { USER_TABLE_NAME, IUserDoc, User };
