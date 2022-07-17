import bcrypt from "bcryptjs";

class Password {
	static toHash(password: string) {
		return bcrypt.hashSync(password, 12);
	}

	static toCompare(password: string, hashPassword: string) {
		return bcrypt.compareSync(password, hashPassword);
	}
}

export { Password };
