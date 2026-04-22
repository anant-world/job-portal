import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAllJobs } from '../redux/jobSlice' // adjust path

function Browse() {

    const dispatch = useDispatch();
    const { allJobs = [] } = useSelector(store => store.job);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/job/get");
                console.log("API RESPONSE:", res.data);

                dispatch(setAllJobs(res.data.jobs));
            } catch (error) {
                console.log("ERROR FETCHING JOBS:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <Navbar />

            <div>
                <h3 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length})
                </h3>

                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.length === 0 ? (
                            <p>No jobs available</p>
                        ) : (
                            allJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse