import express from "express"

import isAuthtenticated from '../middlewares/isAuthtenticated.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";


const router= express .Router();

router.route("/post").post(isAuthtenticated,postJob)
router.route("/get").get(getAllJobs);
router.route("/getAdminjobs").get(isAuthtenticated, getAdminJobs)
router.route("/get/:id").get(isAuthtenticated,getJobById);
export default router;