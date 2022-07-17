import mongoose, { Document, Model, Schema } from "mongoose";

const COURSE_CATEGORY_NAME = "course-category";
interface ICourseCategory {
	title: string;
	slug: string;
	order: number;
	offer?: number;
	active?: string;
}

interface ICourseCateogryDoc extends ICourseCategory, Document {}

interface ICourseCategoryModel extends Model<ICourseCateogryDoc> {
	addNew(attr: ICourseCategory): ICourseCateogryDoc;
}

const schema: Schema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},
		slug: {
			type: String,
			require: true,
		},
		order: {
			type: Number,
			default: 0,
		},
		offer: {
			type: Number,
			default: 0,
		},
		active: {
			type: Number,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

schema.statics.addNew = (attr: Attr) => {
	return new CourseCategory(attr);
};

const CourseCategory = mongoose.model<ICourseCateogryDoc, ICourseCategoryModel>(
	COURSE_CATEGORY_NAME,
	schema
);

export { COURSE_CATEGORY_NAME, ICourseCateogryDoc, CourseCategory };
