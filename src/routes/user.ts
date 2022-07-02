import express from "express";
import {signIn, signUp} from "../controllers/user";
const route = express.Router();

route.post("/auth/", signIn);
route.post("/auth/signup", signUp);
// export
export {route as userRoutes};
