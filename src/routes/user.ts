import express from "express";
import {signIn, signInEmail, signUp} from "../controllers/user";

// route
const route = express.Router();
const prefix = "/auth";

// routes
route.post(prefix, signInEmail);
route.post(prefix + "/google", signIn);
route.post(prefix + "/signup", signUp);
// export
export {route as userRoutes};
