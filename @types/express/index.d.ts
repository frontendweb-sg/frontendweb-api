// jwt response
interface UserPayload {
	id: string;
	email: string;
	role: string;
	firebase_uid: string;
}

declare namespace Express {
	export interface Request {
		user: UserPayload;
	}
}
