import React from 'react'
import { Badge } from './ui/badge'

function LatestJobsCards(job) {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>

      <h3 className='font-medium text-lg'>{job?.company?.name}</h3>
      <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h3 className='font-bold text-lg my-2'>{job?.title}</h3>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4 '>
          <Badge className="text-blue-700 font-bold">{job?.position}</Badge>
          <Badge className="text-[#F83002] font-bold">{job?.jobType}</Badge>
          <Badge className="text-[#7209b7] font-bold">{job?.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCards
