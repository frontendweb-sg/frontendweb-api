import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV}`});
import morgan from "morgan";
import {connectDb} from "./db";
import cors from "cors";
// app
const app = express();
const PORT = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "..", "uploads")));

// middleware
app.use(
	cors({
		origin: "localhost:3000",
	})
);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
} else {
}

// routes
app.get("/api", (req, res, next) => {
	res.send({
		message: "Api is running...",
	});
});

// errors

// listen
const server = app.listen(PORT, async () => {
	console.log("Server is running on --- ", PORT);
	await connectDb();
});