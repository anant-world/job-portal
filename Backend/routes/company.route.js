import express from "express"
import {logout,updateProfile,login,register } from "../controller/user.controller.js"
import isAuthenticated from '../middlewares/isAuthtenticated.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js"
import { upload } from "../middlewares/multer.js";

const router= express .Router();

console.log("🔥 company route loaded");
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated,upload.single("file"),updateCompany)

export default router;