import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV}`});
import path from "path";
import express from "express";
import {connectDb} from "./db";
import cors from "cors";
import {userRoutes} from "./routes/user";
import "./firebase";

// app
const app = express();
const PORT = process.env.PORT || 3001;

// app setting
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

if (process.env.NODE_ENV === "development") {
} else {
}

// routes
app.use("/api/user", userRoutes);
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

export {server};
