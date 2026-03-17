import {  Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId
    } = req.body;

    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false
      });
    }

    if (
      !title || !description || !requirements || !salary ||
      !location || !jobType || !experience || !position || !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job
    });

  } catch (error) {
    console.log("post job error", error);
    return res.status(500).json({
      message: "Job posting cannot be created",
      success: false
    });
  }
};


export const getAllJobs=async(req,res)=>{
    try {
        const keyword= req.query.keyword || ""
        const query={
           $or:[
            {title:{$regex:keyword ,$options:"i"}},
            {description:{$regex:keyword ,$options:"i"}}
            
           ]
        };
        const jobs= await Job.find(query)
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("Can't get all jobs posting error",error);
        return res.status(500).json({
            message:"cannot get all job postings ",
            success:false
        })
        
    }
}

export const getJobById= async(req,res)=>{
    try{
        const jobId= req.params.id;
        const job= await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!job){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(200).json({job,
            success:true
        })
    }
    catch(error){
        console.log("get jobs by id error",error);
    }
}
export const getAdminJobs= async(req,res)=>{
    try {
        const adminId= req.id;
        const jobs= await Job.find({created_by: adminId})
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("get Admin jobs error",error);
        
    }
}