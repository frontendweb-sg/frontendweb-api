import mongoose from "mongoose";
import {IRole} from "../utility";

/**
 * User schema
 */

export interface userAttr {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	mobile?: string;
	photo_url?: string;
	firebase_uid?: string;
	country?: string;
	timezone?: string;
	role?: IRole;
	active?: boolean;
}

export interface UserDoc extends mongoose.Document {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	mobile?: string;
	photo_url?: string;
	firebase_uid?: string;
	country?: string;
	timezone?: string;
	role?: IRole;
	active?: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
	addUser(attr: userAttr): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		first_name: {type: String, require: true},
		last_name: {type: String, require: true},
		username: {type: String, require: true},
		email: {type: String, unique: true},
		mobile: {type: String, default: ""},
		photo_url: {type: String},
		role: {type: String, default: "user", enum: IRole},
		firebase_uid: {type: String, require: true},
		country: {type: String},
		timezone: {type: String},
		active: {type: Boolean, default: true},
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

userSchema.statics.addUser = (user: userAttr) => {
	return new User(user);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export
export {User};
