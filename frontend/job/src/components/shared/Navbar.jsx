import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/")
            }
        } catch (error) {
            console.log("logout error");

        }
    }

    const { user } = useSelector(store => store.auth)
    return (
        <div className='bg-white '>
            <div className='flex items-center w-full h-16 px-4 ' >

                <div>
                    <h2 className='text-3xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h2>
                </div>
                <div className='flex item-center gap-6 ml-auto'>
                    <ul className='flex font-medium items-center gap-5 '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>

                                    <li><Link to="/">Companies</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {!user ? (
                        <div className="flex gap-3">
                            <Link to="/login">
                                <Button >Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button >Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>

                                        <h4 className='font-medium '>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 text-gray-600">
                                    {
                                        user && user.role === 'student' && (
                                            <div className='flex w-fit items-center  cursor-pointer'>
                                                <User2></User2>
                                                <Button variant='ghost'><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )
                                    }

                                    <div>
                                        <LogOut></LogOut>
                                        <Button onClick={logoutHandler} variant='ghost' > Logout</Button>
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Navbar
