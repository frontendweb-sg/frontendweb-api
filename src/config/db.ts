export interface IDbConfig {
	db: string;
	host: string;
	port: string;
	username: string;
	password: string;
}
export const dbConfig = {
	db: process.env.DB,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
} as IDbConfig;
