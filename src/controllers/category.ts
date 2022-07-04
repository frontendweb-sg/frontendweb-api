import {NextFunction, Request, Response} from "express";
import {BadRequestError, NotFoundError} from "../errors";
import {CatDoc, Category} from "../models/category";
import {Post} from "../models/post";
import {responseBody, slugname, transformRespnose} from "../utility";

/**
 * Get catgories
 */
const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cats = (await Category.find().sort({
			insertAt: 1,
		})) as CatDoc[];
		res.status(200).send({data: transformRespnose(cats, "category")});
	} catch (err) {
		throw next(err);
	}
};

/**
 * Get catgories
 */
const addUpdateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const catId = req.params.catId;
		const {title, description, image} = req.body;
		let slug = req.body.slug;
		const existCat = await Category.findById(catId);

		// if category existed
		if (existCat) {
			slug = slugname(title);
			existCat.title = title;
			existCat.slug = slug;
			existCat.description = description;
			existCat.image = image;
			await existCat.save();
			return res
				.status(200)
				.send({data: transformRespnose(existCat, "category")});
		} else {
			if (slug === "") slug = slugname(title);
			const cateogry = Category.build({
				title,
				slug,
				description,
				image,
			});

			await cateogry.save();
			return res
				.status(201)
				.send({data: transformRespnose(cateogry, "category")});
		}
	} catch (err) {
		throw next(err);
	}
};

/**
 * Get catgories
 */
const deleteCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const catId = req.params.catId;
		const cateogry = await Category.findById(catId);
		if (!cateogry) {
			throw new NotFoundError("Category not found!");
		}
		const result = await cateogry.remove();
		await Post.deleteMany({category: result._id}); // delete all post relative to category
		return res
			.status(200)
			.send({data: transformRespnose(cateogry, "category")});
	} catch (err) {
		throw next(err);
	}
};

/**
 * Get catgories
 */
const activateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const catId = req.params.catId;
		const cateogry = await Category.findById(catId);
		if (!cateogry) {
			throw new NotFoundError("Category not found!");
		}
		if (cateogry.active) {
			throw new BadRequestError("Category already activated!");
		}
		cateogry.active = true;
		await cateogry.save();
		await Post.updateMany({category: catId}, {$set: {active: true}}); // delete all post relative to category
		return res
			.status(200)
			.send({data: transformRespnose(cateogry, "category")});
	} catch (err) {
		throw next(err);
	}
};

/**
 * Get catgories
 */
const deactivateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const catId = req.params.catId;
		const cateogry = (await Category.findById(catId)) as CatDoc;
		if (!cateogry) {
			throw new NotFoundError("Category not found!");
		}
		if (!cateogry.active) {
			throw new BadRequestError("Category already deactivated!");
		}
		cateogry.active = false;
		await cateogry.save();
		await Post.updateMany({category: catId}, {$set: {active: false}}); // delete all post relative to category
		return res
			.status(200)
			.send({data: transformRespnose(cateogry, "category")});
	} catch (err) {
		throw next(err);
	}
};

// export
export {
	getCategories,
	addUpdateCategory,
	deleteCategory,
	activateCategory,
	deactivateCategory,
};
