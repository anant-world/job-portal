import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { Title } from '@radix-ui/react-dialog'

function Job({job}) {
  const navigate= useNavigate();
  // const jobId="hothaofhpa"
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt= new Date(mongodbTime)
    const currentTime= new Date();
    const timeDifference= currentTime - createdAt
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>

      <p className='text-sm text-gray-500 '>{daysAgoFunction(job?.createdAt === 0 ? "Today" :`${daysAgoFunction(job?.createdAt)} days ago`)}2 days ago</p>
      <Button className="rounded-full " size="icon"><Bookmark/></Button>
        </div>
      <div className='flex items-center gap-2 my-2'>
    <Button className="p-6" size="icon">
        <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cf9bPbrkwgi4ut6PScrrj9ZoZk3ic8G82A&s"/>

            
        </Avatar>
      </Button>
      </div>

      
      <div>
        <h3 className='font-medium text-lg'>{job?.company?.name}</h3>
        <p>India</p>
      </div>
      <div>
        <h3 className='font-bold text-lg my-2'>{job?.title}</h3>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
   <div className='flex items-center gap-2 mt-4 '>
          <Badge className="text-blue-700 font-bold">{job?.position}Position</Badge>
          <Badge className="text-[#F83002] font-bold">{job?.jobType}</Badge>
          <Badge className="text-[#7209b7] font-bold">{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={()=> navigate(`/description/${job?._id}`)}>Details</Button>
            <Button className="bg-[#7209b7]">Save for later</Button>
        </div>
    </div>
  )
}

export default Job
