import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
	status: string;
	insertAt?: Date;
}

// post attribute
export interface PostAttr {
	category: string;
	user: string;
	title: string;
	subtitle?: string;
	description: string;
	image: string;
	likes?: ILike[];
	comments?: IComments[];
	active?: boolean;
	insertAt?: Date;
}

// Post document interface extend
export interface PostDoc extends mongoose.Document {
	category: string;
	user: string;
	title: string;
	description: string;
	image: string;
	likes?: ILike[];
	comments?: IComments[];
	active?: boolean;
	insertAt?: Date;
}

// Post model interface extends
interface PostModel extends mongoose.Model<PostDoc> {
	build(attr: PostAttr): PostDoc;
}

// post schema
const postSchema = new Schema(
	{
		category: {type: Schema.Types.ObjectId, ref: "Category"},
		user: {type: Schema.Types.ObjectId, ref: "User"},
		title: {type: String, required: true},
		description: {type: String, required: true},
		image: {type: String, required: true},
		active: {type: Boolean, default: true},
		likes: [
			{
				user: {type: Schema.Types.ObjectId, ref: "User"},
				active: {type: Boolean, default: false},
			},
		],
		comments: [
			{
				user: {type: Schema.Types.ObjectId, ref: "User"},
				name: {type: String, required: true},
				message: {type: String, required: true},
				avatar: {type: String},
				status: {
					type: String,
					default: "pending",
					enum: ["pending", "approved", "rejected"],
				},
				insertAt: {type: Date, default: Date.now},
			},
		],
		insertAt: {type: Date, default: Date.now},
	},
	{
		toJSON: {
			transform(doc: PostDoc, ret: PostDoc) {
				delete ret.__v;
			},
		},
	}
);

// static methods

postSchema.statics.build = (attr: PostAttr) => {
	return new Post(attr);
};

// export schema
const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export {Post};
