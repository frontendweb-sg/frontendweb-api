import { Router } from "express";
import { body } from "express-validator";
import {
	addUpdateCourseCategory,
	courseCategoryStatus,
	deleteCourseCategory,
	getCourseCategory,
} from "../controllers/course-category";
import { validateRequest } from "../middleware";

// route
const route = Router();

/** get all course category */
route.get("/", getCourseCategory);

/** add new category */
route.post(
	"/",
	[body("title", "Title is required!").notEmpty()],
	validateRequest,
	addUpdateCourseCategory
);

/** update new course category */
route.put(
	"/:course_category_id",
	[body("title", "Title is required!").notEmpty()],
	validateRequest,
	addUpdateCourseCategory
);

/** delete course category */
route.delete("/:course_category_id", deleteCourseCategory);

/** udpate course category status (Active/Inactive) */
route.put("/status/:course_category_id", courseCategoryStatus);

// export
export { route as courseCategoryRoute };
