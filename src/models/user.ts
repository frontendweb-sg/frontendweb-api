import mongoose from "mongoose";

/**
 * User schema
 */

export interface userAttr {
	first_name?: string;
	last_name?: string;
	username: string;
	email: string;
	password: string;
	mobile?: string;
	photo_url?: string;
	active?: boolean;
}

export interface UserDoc extends mongoose.Document {
	first_name?: string;
	last_name?: string;
	username: string;
	email: string;
	password: string;
	mobile?: string;
	photo_url?: string;
	active?: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
	addNew(attr: userAttr): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		first_name: {type: String},
		last_name: {type: String},
		username: {type: String},
		email: {type: String, unique: true},
		password: {type: String},
		mobile: {type: String, unique: true},
		active: {type: Boolean, default: true},
		accessToken: {type: String},
		expireTime: {type: Date},
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

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export
export {User};
