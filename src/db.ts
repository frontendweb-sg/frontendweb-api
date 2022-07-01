import mongoose, {mongo} from "mongoose";
import {dbConfig} from "./config/db";

let url: string;
if (process.env.NODE_ENV === "development") {
	url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
} else {
	url = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/?retryWrites=true&w=majority`;
}

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(url);
		console.log("Database connected!");
	} catch (error) {
		console.log("error", error);
	}
};

export {connectDb};
