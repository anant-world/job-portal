import React,{useState} from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Contact } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { Dialog,DialogContent,DialogHeader } from './ui/dialog'
import { useSelector } from 'react-redux'


// const skills = ["Html", "javascript", "reactjs", "nodejs"]


function Profile() {
  const isResume = true
  const [open, setOpen]= useState(false);
  const {user}=useSelector(store=>store.auth)
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-180 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>

          <div className='flex items-center gap-4'>

            <Avatar className="h-24 w-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cf9bPbrkwgi4ut6PScrrj9ZoZk3ic8G82A&s" />
            </Avatar>
            <div>

              <h3 className='font-medium text-xl '>{user?.fullname}</h3>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" > <Pen /></Button>
        </div>
        <div className='my-5 '>
          <div className='flex item-center gap-4'>

            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex item-center gap-4'>

            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h3>Skills</h3>
          <div className='flex item-center gap-1'>
            {
              user?.profile?.skills.length === 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>):<span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a target='blank' href='https://youtube.com/@t-series' className='text-blue-500 w-full hover:underline cursor-pointer'> {user?.profile?.resumeOriginaName}</a> : <span>NA</span>
            }
        </div>
      </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h3 className='font-bold text-lg my-5'>Applied Jobs</h3>
            <AppliedJobsTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
