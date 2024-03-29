import mongoose from "mongoose";
const Schmea = mongoose.Schema;

// category attribute
interface catAttrs {
	title: string;
	slug: string;
	active?: boolean;
}

// category document
export interface CatDoc extends mongoose.Document {
	title: string;
	slug: string;
	active?: boolean;
}

// category model
interface CatModel extends mongoose.Model<CatDoc> {
	addNew(attr: catAttrs): CatDoc;
}

// category schema
const categorySchema = new Schmea(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
			},
		},
	}
);

// static methods
categorySchema.statics.addNew = (attr: catAttrs) => {
	return new Category(attr);
};

// category
const Category = mongoose.model<CatDoc, CatModel>("Category", categorySchema);

// export
export { Category };
