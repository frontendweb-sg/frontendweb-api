import express from "express";
import { body } from "express-validator";
import {
	activeInactivePost,
	addUpdatePost,
	deletePost,
	getPost,
	getPosts,
	likeDislikePost,
} from "../controllers/post";
const route = express.Router();

/**
 * Method               GET
 * Access Level         Private
 * Url                  https://localhost:4200/api/post
 */

route.get("/", getPosts);

/**
 * Method               POST
 * Access Level         Private
 * Url                  https://localhost:4200/api/post
 */
route.post(
	"/",
	[
		body("title", "Title is required!").notEmpty(),
		body("content", "Content is required").notEmpty(),
	],
	addUpdatePost
);

/**
 * Method               GET
 * Access Level         Private
 * Url                  https://localhost:4200/api/post/:id
 */
route.get("/:id", getPost);

/**
 * Method               POST
 * Access Level         Private
 * Url                  https://localhost:4200/api/post
 */
route.put(
	"/:id",
	[
		body("title", "Title is required!").notEmpty(),
		body("content", "Content is required").notEmpty(),
	],
	addUpdatePost
);

/**
 * Method               DELETE
 * Access Level         Private
 * Url                  https://localhost:4200/api/post/:id
 */
route.delete("/:id", deletePost);

/**
 * Method               put
 * Access Level         Private
 * Url                  https://localhost:4200/api/post/:id
 */
route.put("/status/:id", activeInactivePost);

/**
 * Method               put
 * Access Level         Private
 * Url                  https://localhost:4200/api/post/:id
 */
route.put("/social/:id", likeDislikePost);

export { route as postRouter };
