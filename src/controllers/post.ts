import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors";
import { ILike, Post, PostDoc } from "../models/post";

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
 * Like or Dislike
 * @param req
 * @param res
 * @param next
 */
const likeDislikePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// const userId = req.user.id;
		// const id = req.params.id;
		// const status = req.query.status;
		// const post = (await Post.findById(id)) as PostDoc;
		// // all likes
		// // const Likes = post.likes?.filter(
		// // 	(like) => like.user.toString() === userId
		// // ) as ILike[];
		// const like = post.likes?.find(
		// 	(like) => like.user.toString() === userId
		// ) as ILike;
		// if (status === "like") {
		// 	console.log("hi like");
		// 	if (like && like.active) {
		// 		throw new BadRequestError("You have already liked this post!");
		// 	} else {
		// 		post.likes?.unshift({ user: userId, active: true });
		// 	}
		// }
		// if (status === "dislike") {
		// 	if (like && !like.active) {
		// 		throw new BadRequestError("You have already disliked this post!");
		// 	} else {
		// 		post.likes?.unshift({ user: userId, active: false });
		// 	}
		// }
		// await post.save();
		// return res.status(200).send(post);
	} catch (error) {
		throw next(error);
	}
};

function updateLikes(post: PostDoc, userId: string, value: boolean) {
	const existLikes = post.likes as ILike[];
	const index = existLikes.findIndex(
		(like: ILike) => like.user.toString() === userId
	);
	const existLike = existLikes[index];
	existLike.active = value;
	existLikes[index] = existLike;
	post.likes = existLikes;
}
export {
	getPost,
	getPosts,
	addUpdatePost,
	deletePost,
	activeInactivePost,
	likeDislikePost,
};
