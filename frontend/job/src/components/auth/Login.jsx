import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Toaster } from '../ui/sonner'
import { USER_API_END_POINT } from "../../utils/constant"
import { useDispatch } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
function Login() {
    const [input, setInput] = useState({

        email: "",

        password: "",
        role: "",

    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading}=useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }





    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);

        }finally{
            dispatch(setLoading(false))
        }

    }



    return (
        <div className=''>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>

                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label>E-mail</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}>
                        </Input>
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}>
                        </Input>
                    </div>
                    <div className='flex items-center justify-between '>
                        <RadioGroup className="flex item-center space-x-2">
                            <div className="flex items-center gap-3">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>

                    </div>
                    {
                        loading ? <Button className=""><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    
                    <span>Don't have an account ? <Link to="/signup" className="text-blue-600">Sign up</Link></span>
                </form>
            </div>
        </div>

    )
}

export default Login
