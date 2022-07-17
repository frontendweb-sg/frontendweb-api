import { Router } from "express";
import { body } from "express-validator";
import {
	getCourse,
	getCourses,
	addUpdateCourse,
	deleteCourse,
	courseUpdateStatus,
} from "../controllers/course";

const route = Router();

/** Get all courses */
route.get("/", getCourses);

/** Get course by course_id */
route.get("/:course_id", getCourse);

/** Add course */
route.post(
	"/",
	[
		body("title", "Course name is required!").notEmpty(),
		body("category", "Course category is required").notEmpty(),
		body("description", "Description is required!").notEmpty(),
	],
	addUpdateCourse
);

route.put(
	"/:course_id",
	[
		body("title", "Course name is required!").notEmpty(),
		body("category", "Course category is required").notEmpty(),
		body("description", "Description is required!").notEmpty(),
	],
	addUpdateCourse
);

/** Delete course */
route.delete("/:course_id", deleteCourse);

/** Update course status */
route.put("/status/:course_id", courseUpdateStatus);

export { route as courseRoute };
