import admin from "firebase-admin";
import {firebaseSdkConfig} from "../config/firebase";

// firebase sdk
admin.initializeApp({
	credential: admin.credential.cert(firebaseSdkConfig as any),
});
