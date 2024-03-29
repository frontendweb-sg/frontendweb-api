import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import path from "path";
import express from "express";
import cors from "cors";
import { connectDb } from "./db";
import { errorHandler } from "./middleware";
import { userRoutes } from "./routes/user";
import { categoryRouter } from "./routes/category";
import { postRouter } from "./routes/post";
import { courseCategoryRoute } from "./routes/course-category";
import "./firebase";
import { courseRoute } from "./routes/course";

// database connect
connectDb();

// app
const app = express();
const PORT = process.env.PORT || 3001;

// app setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "uploads")));

// middleware
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

// routes
app
	.use("/api/user", userRoutes)
	.use("/api/post-category", categoryRouter)
	.use("/api/post", postRouter)
	.use("/api/course-category", courseCategoryRoute)
	.use("/api/course", courseRoute)
	.get("/api", (req, res, next) => {
		res.send({
			message: "Api is running...",
		});
	});

// errors
app.use(errorHandler);

// listen
const server = app.listen(PORT, async () => {
	console.log("Server is running on --- ", PORT);
});

interface ISignal {
	SIGHUP: number;
	SIGINT: number;
	SIGTERM: number;
}
const signals = {
	SIGHUP: 1,
	SIGINT: 2,
	SIGTERM: 15,
};

// Do any necessary shutdown logic for our application here
const shutdown = (signal: any, value?: number) => {
	console.log("shutdown!");
	server.close(() => {
		console.log(`server stopped by ${signal} with value ${value}`);
		process.exit(0);
	});
};

// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal: string) => {
	process.on(signal, () => {
		console.log(`process received a ${signal} signal`);
		shutdown(signal);
	});
});
export { server };
