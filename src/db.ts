import mongoose, {mongo} from "mongoose";
import {dbConfig} from "./config/db";

let url: string;
if (process.env.NODE_ENV === "development") {
	url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
} else {
}

const connectDb = async () => {
	try {
		const connect = mongoose.connect(url);
		console.log("Database connected!");
	} catch (error) {
		console.log("error", error);
	}
};

export {connectDb};
