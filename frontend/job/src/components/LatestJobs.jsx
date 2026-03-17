import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux'

function LatestJobs() {
  const { allJobs } = useSelector(store => store.job)
  console.log("ALL JOBS 👉", allJobs);
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </h1>

      {/* ✅ ADD THIS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {allJobs?.length === 0 ? (
          <span>No job available</span>
        ) : (
          allJobs.slice(0, 6).map(job => (
            <LatestJobsCards key={job._id} {...job} />
          ))
        )}
      </div>
    </div>
  )
}

export default LatestJobs
