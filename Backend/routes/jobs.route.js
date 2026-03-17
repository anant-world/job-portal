import express from "express"

import isAuthenticated from '../middlewares/isAuthtenticated.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";


const router= express .Router();

router.route("/post").post(isAuthenticated,postJob)
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getAdminjobs").get(isAuthenticated, getAdminJobs)
router.route("/get/:id").get(isAuthenticated,getJobById);
export default router;