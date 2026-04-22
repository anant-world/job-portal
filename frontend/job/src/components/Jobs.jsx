import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAllJobs } from '../redux/jobSlice'

function Jobs() {
  const dispatch = useDispatch();
  const { allJobs = [] } = useSelector(store => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/job/get");
        dispatch(setAllJobs(res.data.jobs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-6 px-4 flex gap-6'>

        {/* 🔹 Sidebar */}
        <div className='w-[25%] bg-white p-4 rounded-lg shadow'>
          <h2 className='font-bold text-lg mb-4'>Filter Jobs</h2>

          <div className='mb-4'>
            <h3 className='font-semibold'>Location</h3>
            {["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"].map(loc => (
              <div key={loc}>
                <label className='flex gap-2'>
                  <input type='checkbox' />
                  {loc}
                </label>
              </div>
            ))}
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold'>Industry</h3>
            {["Frontend", "Backend", "FullStack"].map(type => (
              <div key={type}>
                <label className='flex gap-2'>
                  <input type='checkbox' />
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Jobs Section */}
        <div className='w-[75%]'>

          <h2 className='font-bold text-xl mb-4'>
            Jobs Found ({allJobs.length})
          </h2>

          {allJobs.length === 0 ? (
            <div className='text-center text-gray-500 mt-20'>
              🚫 No jobs available
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {allJobs.map(job => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Jobs