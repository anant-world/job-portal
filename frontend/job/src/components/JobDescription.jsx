import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';




function JobDescription() {
  const params = useParams();
  const jobId = params.id;

  const { user } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job);
  const dispatch = useDispatch();

  // ✅ define this BEFORE useState
  const isInitiallyApplied =
    singleJob?.applications?.some(
      application => application.applicant === user?._id
    ) || false;

  // ✅ correct useState
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id }
          ]
        };

        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              application => application.applicant === user?._id
            )
          );
          console.log(res.data.job)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-xl'>
          {singleJob?.title}
        </h3>

        <div className='flex items-center gap-2 mt-4'>
          <Badge>{singleJob?.position}</Badge>
          <Badge>{singleJob?.jobType}</Badge>
          <Badge>{singleJob?.salary}</Badge>
        </div>
      </div>

      <Button
        onClick={isApplied ? null : applyJobHandler}
        disabled={isApplied}
        className={`rounded-lg ${
          isApplied
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-[#7209b7] hover:bg-[#5f32ad]'
        }`}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </Button>

      <h3 className='border-b-4 border-b-gray-300 font-medium py-4'>
        Job Description
      </h3>

      <div>
        <h3>Role: {singleJob?.role}</h3>
        <h3>Location: {singleJob?.location}</h3>
        <h3>Description: {singleJob?.description}</h3>
        <h3>Experience: {singleJob?.experience}</h3>
        <h3>Salary: {singleJob?.salary}</h3>
        <h3>Total Applicants: {singleJob?.applications?.length}</h3>
        <h3>
          Posted Date:{" "}
          {singleJob?.createdAt?.split("T")[0]}
        </h3>
      </div>
    </div>
  );
}
export default JobDescription