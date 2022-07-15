import express from "express";
import {
	getCategories,
	addUpdateCategory,
	deleteCategory,
	enableInactiveCategory,
} from "../controllers/category";
import { body } from "express-validator";
import { auth, validateRequest } from "../middleware";

// route
const route = express.Router();

/**
 * Method               GET
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.get("/", getCategories);

/**
 * Method               POST
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route
	.post(
		"/",
		[body("title", "Category name is required!").notEmpty()],
		validateRequest,
		addUpdateCategory
	)
	.put(
		"/:catId",
		[body("title", "Category name is required!").notEmpty()],
		validateRequest,
		addUpdateCategory
	);

/**
 * Method               Delete
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.delete("/:catId", deleteCategory);

/**
 * Method               PUT
 * Access Level         Private
 * Url                  https://localhost:4200/api/category/activate
 */
route.put("/status/:catId", enableInactiveCategory);

// export route
export { route as categoryRouter };
