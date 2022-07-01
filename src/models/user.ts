import mongoose from "mongoose";

/**
 * User schema
 */

const userSchema = new mongoose.Schema({
	first_name: {type: String},
	last_name: {type: String},
	username: {type: String},
	email: {type: String, unique: true},
	password: {type: String},
});
