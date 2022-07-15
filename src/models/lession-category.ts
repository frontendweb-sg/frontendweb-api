import mongoose, { Document, Model, Schema } from "mongoose";
import { COURSE_TABLE } from "./course";

// attributes
interface ILessionCategory {
	course: string;
	title: string;
	slug: string;
	description: string;
	order: number;
	active?: boolean;
}

interface ILessonCategoryDoc
	extends ILessionCategory,
		Document<ILessionCategory> {}

interface ILessionCatModel extends mongoose.Model<ILessonCategoryDoc> {
	addNew(cat: ILessionCategory): ILessonCategoryDoc;
}

const schema = new Schema(
	{
		course: { type: Schema.Types.ObjectId, required: true, ref: COURSE_TABLE },
		title: { type: String, required: true },
		slug: { type: String, required: true },
		description: { type: String },
		order: { type: Number, default: 0 },
		offer: { type: Number, default: 0 },
		active: { type: Boolean, default: true },
	},
	{ timestamps: true }
);
