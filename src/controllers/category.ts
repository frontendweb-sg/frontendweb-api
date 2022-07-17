import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { CatDoc, Category } from "../models/category";
import { Post } from "../models/post";
import { slugname } from "../utility";

/**
 * Get catgories
 */
const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cats = (await Category.find().sort({ title: 1 })) as CatDoc[];
		res.status(200).send(cats);
	} catch (err) {
		next(err);
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
		const { title } = req.body;
		let slug = req.body.slug;

		const existCat = await Category.findById(catId);

		// if category existed
		if (existCat) {
			slug = slugname(title);
			existCat.title = title;
			existCat.slug = slug;
			await existCat.save();
			return res.status(200).send(existCat);
		}

		if (!slug) slug = slugname(title);
		const cateogry = Category.addNew({
			title,
			slug,
		});

		await cateogry.save();
		return res.status(201).send(cateogry);
	} catch (err) {
		next(err);
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
		await Post.deleteMany({ category: result._id }); // delete all post relative to category
		return res.status(200).send({ _id: catId });
	} catch (err) {
		next(err);
	}
};

/**
 * Get catgories
 */
const enableInactiveCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const catId = req.params.catId;
	const status = req.query?.status;
	try {
		const cat = await Category.findById(catId);

		if (!cat) {
			throw new NotFoundError("Category not found!");
		}

		if (status === "active") {
			cat.active = true;
			//await Post.updateMany({ category: catId }, { $set: { active: true } }); // delete all post relative to category
		}

		if (status === "inactive") {
			cat.active = false;
			//await Post.updateMany({ category: catId }, { $set: { active: false } }); // delete all post relative to category
		}

		await cat.save();
		return res.status(200).send(cat);
	} catch (err) {
		next(err);
	}
};

// export
export {
	getCategories,
	addUpdateCategory,
	deleteCategory,
	enableInactiveCategory,
};
