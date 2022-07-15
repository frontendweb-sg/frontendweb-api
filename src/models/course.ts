import mongoose, { Document, Model, Schema } from "mongoose";
import { ESkill, EStatus } from "../utility";

/**
 * html{
 *  title:'html',
 *  image:'',
 *  description:'',
 *  excerpt:''
 *  category:['website designer','developer'],
 *  price:500rs,
 *  offer:10%,
 *  status:'publish',
 *  isFree:false,
 *  skill-type:'beginers',
 * }
 */

const COURSE_TABLE = "Course";
interface ICourse {
	category: string;
	title: string;
	slug: string;
	image: string;
	description: string;
	excerpt: string;
	skill_type: ESkill;
	status: EStatus;
	price: Number;
	offer: Number;
	isFree?: boolean;
	active?: boolean;
}

interface ICourseDoc extends ICourse, Document<ICourse> {}

interface ICourseModel extends Model<ICourseDoc> {
	addNew(attr: ICourse): ICourseDoc;
}

const courseSchema = new Schema(
	{
		category: { type: String, require: true },
		title: { type: String, require: true },
		slug: { type: String, require: true },
		image: { type: String },
		description: { type: String },
		excerpt: { type: String },
		skill_type: { type: String, enum: ESkill, default: ESkill.beginers },
		status: { type: String, enum: EStatus, default: EStatus.PENDING },
		price: { type: Number, default: 0 },
		offer: { type: Number, default: 0 },
		isFree: { type: Boolean, default: true },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);

courseSchema.statics.addNew = (attr: ICourse) => {
	return new Course(attr);
};

const Course = mongoose.model<ICourseDoc, ICourseModel>(
	COURSE_TABLE,
	courseSchema
);

export { COURSE_TABLE, Course, ICourseDoc };
