import { Request, Response, NextFunction } from "express";
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
		throw next(error);
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
	let { title, slug, order, offer } = req.body;
	const id = req.params.course_category_id;
	try {
		if (slug === "") slug = slugname(title);

		const category = (await CourseCategory.findById(id)) as ICourseCateogryDoc;

		if (category) {
			category.title = title;
			category.slug = slug;
			category.order = order;
			category.offer = offer;

			await category.save();
			return res.send(200).send(category);
		}

		const newCat = CourseCategory.addNew({
			title,
			slug,
			order,
			offer,
		}) as ICourseCateogryDoc;

		await newCat.save();
		return res.status(201).send(newCat);
	} catch (error) {
		throw next(error);
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
