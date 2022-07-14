import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors";
import { CourseCategory, ICourseCateogryDoc } from "../models/course-category";
import { slugname } from "../utility";

/**
 * Fetch all course categories
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getCourseCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const categories = (await CourseCategory.find({})) as ICourseCateogryDoc[];
		return res.status(200).send(categories);
	} catch (error) {
		next(error);
	}
};

/**
 * Course category add / update
 * @param req
 * @param res
 * @param next
 * @returns
 */
const addUpdateCourseCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { title, order, offer } = req.body;
	let slug = req.body.slug;
	const id = req.params.course_category_id;
	try {
		if (slug == undefined) slug = slugname(title);

		const category = (await CourseCategory.findById(id)) as ICourseCateogryDoc;

		if (category) {
			category.title = title;
			category.slug = slug;
			category.order = order;
			category.offer = offer;

			await category.save();
			return res.send(200).send(category);
		}

		const isSlugExist = await CourseCategory.findOne({ slug });
		if (isSlugExist) {
			const error = new BadRequestError("Course category already exited!");
			throw next(error);
		}

		const cat = CourseCategory.addNew({
			title,
			slug,
			order,
			offer,
		}) as ICourseCateogryDoc;

		const result = await cat.save();
		return res.status(201).send(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const deleteCourseCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
const courseCategoryStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export {
	getCourseCategory,
	addUpdateCourseCategory,
	deleteCourseCategory,
	courseCategoryStatus,
};
