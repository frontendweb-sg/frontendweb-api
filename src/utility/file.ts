import fs from "fs";
import path from "path";
import {regExp} from "./regexp";
const resizeImg = require("resize-img");

// file name
const filename = (file: any) => file.filename;

// slug name
const slugname = (slug: string) => slug.replace(/\s+/g, "-");

// token expiration date
const tokenExpireDate = (time: number = 1): Date => {
	const date = new Date(Date.now());
	date.setHours(date.getHours() + time);
	return date;
};

// file filter
const filterFile = (req: Request, file: any, cb: Function) => {
	if (!file.originalname.match(regExp.imgReg)) {
		return cb(
			new Error("Please upload file in these formats (jpe?g|png|giff|jfif|pmp)")
		);
	}

	return cb(null, true);
};

// doc file filter
const docFileFilter = (req: Request, file: any, cb: Function) => {
	console.log("hello world");
	if (!file.originalname.match(regExp.docReg)) {
		return cb(
			new Error("Please upload file in these formats (jpe?g|png|giff|jfif|pmp)")
		);
	}

	return cb(null, true);
};

// delete file
const deleteFile = (dirPath: string) => {
	if (fs.existsSync(dirPath)) {
		fs.unlink(dirPath, (err: any) => {
			if (err) new Error(err);
		});
	}
};

const resizeImage = async (dir: any, width: number, height: number) => {
	if (fs.existsSync(`${dir}`)) {
		const image = await resizeImg(fs.readFileSync(`${dir}`), {
			width: 200,
			height: 150,
		});
		console.log("image", image);
		fs.writeFileSync(`${dir}`, image);
	}
};

// NO IMAGE
const noImage = (folder: string, p: any) => {
	return p
		? "http://localhost:4200/" + folder + path.basename(p)
		: "http://localhost:4200/images/noimage.jpg";
};
// export
export {
	slugname,
	tokenExpireDate,
	filename,
	filterFile,
	deleteFile,
	resizeImage,
	noImage,
	docFileFilter,
};
