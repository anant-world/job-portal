import express from "express"
import {logout,updateProfile,login,register } from "../controller/user.controller.js"
import isAuthenticated from '../middlewares/isAuthtenticated.js'
import { upload } from "../middlewares/multer.js";
const router= express .Router();

router.route("/register",).post(upload.single("file"),register);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,upload.single("file"),updateProfile)

export default router;