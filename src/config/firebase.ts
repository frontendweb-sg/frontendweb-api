export interface IFBConfig {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	auth_uri: string;
	token_uri: string;
	auth_provider_x509_cert_url: string;
	client_x509_cert_url: string;
}
export const firebaseSdkConfig: IFBConfig = {
	type: process.env.FB_TYPE!,
	project_id: process.env.FB_PROJECT_ID!,
	private_key_id: process.env.FB_PRIVATE_KEY_ID!,
	private_key: process.env.FB_PRIVATE_KEY!,
	client_email: process.env.FB_CLIENT_EMAIL!,
	client_id: process.env.FB_CLIENT_ID!,
	auth_uri: process.env.FB_AUTH_URI!,
	token_uri: process.env.FB_TOKEN_URI!,
	auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL!,
	client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL!,
};
