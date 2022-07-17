import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { Course, ICourseDoc } from "../models/course";
import { deleteFile, EStatus, slugname } from "../utility";

/**
 * Get all courses
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getCourses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const courses = (await Course.find().sort({
			createdAt: 1,
		})) as ICourseDoc[];
		return res.status(200).send(courses);
	} catch (error) {
		next(error);
	}
};

/**
 * Get all courses
 * @param req
 * @param res
 * @param next
 * @returns
 */
const getCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const course_id = req.params.course_id;
		const course = (await Course.findById(course_id)) as ICourseDoc;
		if (!course) {
			throw new NotFoundError("Course not found for this id" + course_id);
		}
		return res.status(200).send(course);
	} catch (error) {
		next(error);
	}
};

/**
 * Add / Update course
 * @param req
 * @param res
 * @param next
 * @returns
 */
const addUpdateCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const course_id = req.params.course_id;
		const { title, description, excerpt, category, skill_type, price, offer } =
			req.body;

		const slug = slugname(title);
		const image = req.file;

		const course = (await Course.findById(course_id)) as ICourseDoc;
		if (course) {
			course.title = title;
			course.slug = slug;
			course.category = category;
			course.description = description;
			course.excerpt = excerpt ?? course.excerpt;
			course.skill_type = skill_type ?? course.skill_type;
			course.price = price ? +price : course.price;
			course.offer = offer ? +offer : course.offer;

			if (image) {
				deleteFile(course.image!);
				course.image = image.path;
			}

			const result = await course.save();
			return res.status(200).send(result);
		}

		const isSlug = (await Course.findOne({ slug })) as ICourseDoc;
		if (isSlug) {
			deleteFile(image?.path!);
			throw new BadRequestError("Course already existed.");
		}

		const newCourse = Course.addNew({
			...req.body,
			slug,
			price: price ? +price : 0,
			offer: offer ? +offer : 0,
		}) as ICourseDoc;

		const result = await newCourse.save();
		result.populate("category");
		return res.status(201).send(result);
	} catch (error) {
		if (req.file) {
			deleteFile(req.file.path);
		}
		next(error);
	}
};

/**
 * Delete all courses
 * @param req
 * @param res
 * @param next
 * @returns
 */
const deleteCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const course_id = req.params.course_id;
		const course = (await Course.findById(course_id)) as ICourseDoc;
		if (!course) {
			throw new NotFoundError("Course not found for this id" + course_id);
		}

		await Course.findByIdAndDelete(course_id);
		return res.status(200).send({ _id: course_id });
	} catch (error) {
		next(error);
	}
};

/**
 * Delete all courses
 * @param req
 * @param res
 * @param next
 * @returns
 */
const courseUpdateStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const course_id = req.params.course_id;
		const status = req.query.status;
		const course = (await Course.findById(course_id)) as ICourseDoc;
		if (!course) {
			throw new NotFoundError("Course not found for this id" + course_id);
		}

		if (status === EStatus.FREE) {
			course.isFree = true;
		}

		if (status === EStatus.ACTIVE) {
			course.active = true;
		}

		if (status === EStatus.INACTIVE) {
			course.active = false;
		}

		if (status == EStatus.PUBLISHED) {
			course.status = EStatus.PUBLISHED;
		}

		if (status == EStatus.DRAFT) {
			course.status = EStatus.DRAFT;
		}

		if (status == EStatus.CANCEL) {
			course.status = EStatus.CANCEL;
		}

		return res.status(200).send(course);
	} catch (error) {
		next(error);
	}
};

export {
	getCourse,
	getCourses,
	addUpdateCourse,
	deleteCourse,
	courseUpdateStatus,
};
