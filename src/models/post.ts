import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum Status {
	PENDING = "pending",
	REJECTED = "rejected",
	APPROVED = "approved",
}
export interface ILike {
	user: string;
	active: boolean;
}

export interface IComments {
	_id?: string;
	user: string;
	name: string;
	email: string;
	message: string;
	status: Status;
	insertAt?: Date;
}

// post attribute
export interface PostAttr {
	category: string;
	user: string;
	title: string;
	subtitle?: string;
	content: string;
	image?: string;
	likes?: ILike[];
	comments?: IComments[];
	active?: boolean;
}

// Post document interface extend
export interface PostDoc extends mongoose.Document {
	category: string;
	user: string;
	title: string;
	subtitle?: string;
	content: string;
	image?: string;
	likes?: ILike[];
	comments?: IComments[];
	active?: boolean;
}

// Post model interface extends
interface PostModel extends mongoose.Model<PostDoc> {
	addNew(attr: PostAttr): PostDoc;
}

// post schema
const postSchema = new Schema(
	{
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		title: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String },
		active: { type: Boolean, default: true },
		likes: [
			{
				user: { type: Schema.Types.ObjectId, ref: "User" },
				active: { type: Boolean, default: false },
			},
		],
		comments: [
			{
				user: { type: Schema.Types.ObjectId, ref: "User" },
				name: { type: String, required: true },
				message: { type: String, required: true },
				avatar: { type: String },
				status: {
					type: String,
					default: "pending",
					enum: Status,
				},
				insertAt: { type: Date, default: Date.now },
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc: PostDoc, ret: PostDoc) {
				delete ret.__v;
			},
		},
	}
);

// static methods

postSchema.statics.addNew = (attr: PostAttr) => {
	return new Post(attr);
};

// export schema
const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
