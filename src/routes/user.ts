import express from "express";
import { signIn, signInWithEmail, signUp } from "../controllers/user";

// route
const route = express.Router();
const prefix = "/auth";

// routes
route.post(prefix, signInWithEmail);
route.post(prefix + "/google", signIn);
route.post(prefix + "/signup", signUp);
// export
export { route as userRoutes };
