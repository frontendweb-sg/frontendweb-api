import mongoose from "mongoose";

/**
 * User schema
 */
enum ERoles {
	user,
	admin,
	superadmin,
}
export interface userAttr {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password?: string;
	mobile?: string;
	photo_url?: string;
	firebase_uid?: string;
	country?: string;
	timezone?: string;
	role?: ERoles;
	active?: boolean;
}

export interface UserDoc extends mongoose.Document {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password?: string;
	mobile?: string;
	photo_url?: string;
	firebase_uid?: string;
	country?: string;
	timezone?: string;
	role?: ERoles;
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
		password: {type: String, require: true},
		mobile: {type: String, unique: true},
		photo_url: {type: String},
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
