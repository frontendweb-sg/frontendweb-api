import fs from "fs";
import multer from "multer";
import {filterFile} from "./file";
import mkdirp from "mkdirp";

// upload file
const uploader = (dir: string, filterFiles?: any) => {
	const diskStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			if (!fs.existsSync(`uploads/${dir}`)) {
				mkdirp(`uploads/${dir}`);
			}
			cb(null, `uploads/${dir}`);
		},
		filename: (req, file, cb) => {
			cb(
				null,
				Date.now().toString() +
					"-" +
					file.originalname.replace(/\s+/, "-").toLowerCase()
			);
		},
	});
	const upload = multer({
		storage: diskStorage,
		fileFilter: filterFiles ? filterFiles : filterFile,
	});
	return upload;
};

export {uploader};
