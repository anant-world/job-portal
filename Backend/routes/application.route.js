import express from "express"
import isAuthenticated from '../middlewares/isAuthtenticated.js'
import { applyJobs, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
import { updateCompany } from "../controller/company.controller.js";

const router= express .Router();

router.route("/apply/:id").get(isAuthenticated,applyJobs)
router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/:id/appicants").get(isAuthenticated,getApplicants)
router.route("status/:id/update").post(isAuthenticated,updateStatus)

export default router;