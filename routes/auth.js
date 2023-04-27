import { Router } from "express";
import {register,login,getMe} from '../controllers/auth.js'
import { checkAuth } from "../utils/checkAuth.js";
const router = new Router();

//регистрация изначально прописан http://localhost:3002/api/auth 
//и добавляем к ней /register и далее функция
router.post("/register", register);

//login
router.post("/login", login);

//get me
router.get("/me", checkAuth , getMe);
export default router;
