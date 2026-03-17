
import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        let profilePhoto = null;

        // ✅ upload only if file exists
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    folder: "job_portal/profile",
                    quality: "auto",
                    fetch_format: "auto",
                }
            );
            profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log("register error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const login = async (req, res)=>{
    try {
        const {email, password, role }=req.body
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect loginId or password",
                success:false
            })
        }
        
        const isPasswordMatch= await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        if(role !=user.role){
            return res.status(400).json({
                message:"Account doesn't exsist with current role",
                success :false
            })
        };
        const tokenData= {
            userId:user._id
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
       const safeUser={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            success:true,
            user:safeUser
        })
    } catch (error) {
       console.error("LOGIN ERROR FULL:", error.message);
  console.error(error.stack);
  return res.status(500).json({
    message: error.message,
    success: false
  });
        
    }
}
export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile= async (req,res)=>{
    try {
        const {fullname,email ,phoneNumber , bio,skills } =req.body;
        console.log(fullname,email, phoneNumber, bio, skills);
        
        const file= req.file;
        
        const fileUri= getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        //cloudinary setup 
        let skillsArray;
        if(skills){
             skillsArray= skills.split(",");
        }
        
        
        const userId= req.id;
        let user= await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }
       if(fullname) user.fullname= fullname
       if(email) user.email= email
       if(phoneNumber) user.phoneNumber= phoneNumber
       if(bio)user.profile.bio= bio
       if(skills) user.profile.skills= skillsArray

       if(cloudResponse){
        user.profile.resume= cloudResponse.secure_url 
        user.profile.resumeOriginalName= file.originalname;
       }

        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"profile updated successfully",
            success:true
        })

    } catch (error) {
        console.log("update error", error)
    }
}
