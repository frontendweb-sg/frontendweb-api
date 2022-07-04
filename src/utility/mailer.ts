import fs from "fs";
import path from "path";
import ejs from "ejs";
import * as nodemailer from "nodemailer";
import {defautlConfig} from "../config";
import {UserDoc} from "../models/user";
const sgTransport = require("nodemailer-sendgrid-transport");

// mail body interface
interface IMail {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

interface mailerBody {
	local: string;
	email: string;
	token: string;
	templateName: string;
	user: UserDoc;
}

// Mailer class
class Mailer {
	private _transport: nodemailer.Transporter;

	static emailContainer(body: mailerBody) {
		const {local, email, token, user, templateName} = body;

		const mailer = new Mailer();
		const readTemplate = fs.readFileSync(
			path.join(__dirname, "..", `views/${templateName}.ejs`),
			"utf-8"
		);

		const template = ejs.compile(readTemplate);
		const roles = ["admin", "superadmin"].includes(user.role);
		if (!roles) {
			mailer.sendMail({
				to: email,
				from: "arya.creativemind@gmail.com",
				subject: "Registration successfull",
				text: `Welcome ${user.firstname} ${user.lastname}`,
				html: template({
					email: email,
					firstname: user.firstname,
					lastname: user.lastname,
					token: token,
					localURL: local,
				}),
			});
		}
	}

	constructor() {
		this._transport = nodemailer.createTransport(
			sgTransport({
				auth: {
					api_key: defautlConfig.EMAIL_API_KEY,
				},
			})
		);
	}

	// send mail
	sendMail(mailOptions: IMail) {
		this._transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				return console.error(`error: ${err}`);
			}
			console.log(`Message Sent`);
		});
	}
}

export {Mailer};
