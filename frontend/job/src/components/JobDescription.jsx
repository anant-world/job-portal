import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';




function JobDescription({job}) {
 
  const params= useParams()
  const jobId = params.id;
  const {user}=useSelector(store=>store.auth)
  const {isApplied,setIsApplied}=useState(isInitiallyApplied)
  const {singleJob}=useSelector(store=>store.job)
  const dispatch= useDispatch();

  const isInitiallyApplied = singleJob?.applications?.some(application=>application.appllicant ===user?._id) || false;

  const applyJobHandler= async()=>{
    try {
      const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
      console.log(res.data);
      
      if(res.data.success){
        dispatch(setSingleJob)
        setIsApplied(true)
        const updateSingleJob= {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob))
      }
    } catch (error) {
      console.log(error);
      
    }
  }
    useEffect(()=>{
    const fetchAllJobs= async()=>{
        try {
            const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
            if(res.data.success)
                dispatch(setAllJobs(res.data.job))
                setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) //ensure the state is in sync with the fetched data
        } catch (error) {
           console.log(error);
            
        }
    }
    fetchAllJobs()
  },[jobId,dispatch, user?._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>

        <h3 className='font-bold text-xl ' job={job}>{singleJob?.title}</h3>
        <div className='flex items-center gap-2 mt-4 '>
          <Badge className="text-blue-700 font-bold">{singleJob?.position || "Frontend Doveloper"}</Badge>
          <Badge className="text-[#F83002] font-bold">{singleJob?.jobType || "Part-Time"}</Badge>
          <Badge className="text-[#7209b7] font-bold">{singleJob?.salary || "24 LPA"}</Badge>
        </div>
      </div>
      <Button
      onClick={isApplied ? null :applyJobHandler}
        disabled={isApplied}
        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied ? "Already Applied" : "Apply Now"}
      </Button>
      <h3 className='border-b-4 border-b-gray-300 font-medium py-4'>Job Description</h3>
      <div >
        <h3 className='font-bold my-1 '>Role :<span className='pl-4 font-normal text-gray-800'>{singleJob?.role}</span></h3>
        <h3 className='font-bold my-1 '>Location :<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h3>
        <h3 className='font-bold my-1 '>Description :<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h3>
        <h3 className='font-bold my-1 '>Experience :<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h3>
        <h3 className='font-bold my-1 '>Salary :<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h3>
        <h3 className='font-bold my-1 '>Total :<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h3>
        <h3 className='font-bold my-1 '>Posted Date :<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h3>
      </div>
    </div>
  )
}

export default JobDescription
