import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors";
import { Post, PostDoc } from "../models/post";

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filter = req.query;
		const posts = await Post.find({ filter })
			.sort({
				createdAt: 1,
			})
			.populate("category user");

		return res.send(posts);
	} catch (error) {
		throw next(error);
	}
};

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const post = await Post.findById(id);

		if (!post) {
			throw new NotFoundError("Post not found!");
		}

		return res.send(post);
	} catch (error) {
		throw next(error);
	}
};

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
const addUpdatePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { category, title, subtitle, content } = req.body;
	const file = req.file;

	try {
		const user = "62c06db63a986f5366f9d887";
		const id = req.params.id;
		const post = (await Post.findById(id)) as PostDoc;

		if (post) {
			post.category = category;
			post.title = title;
			post.subtitle = subtitle;
			post.content = content;

			await post.save();
			return res.status(200).send(post);
		} else {
			const newPost = Post.addNew({
				user,
				category,
				title,
				subtitle,
				content,
			});

			const result = await newPost.save();
			return res.status(201).send(result);
		}
	} catch (error) {
		throw next(error);
	}
};

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const post = await Post.findByIdAndDelete(id);
		if (post) {
			// delete image as well
		}
		return res.status(200).send({ _id: id });
	} catch (error) {
		throw next(error);
	}
};

/**
 * Get all posts
 * @param req
 * @param res
 * @param next
 */
const activeInactivePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;
	const status = req.query?.status;
	try {
		const post = (await Post.findById(id)) as PostDoc;

		if (status === "active") {
			post.active = true;
		}
		if (status === "inactive") {
			post.active = false;
		}

		await post.save();
		return res.status(200).send(post);
	} catch (error) {
		throw next(error);
	}
};

/**
 *
 */
export { getPost, getPosts, addUpdatePost, deletePost, activeInactivePost };
