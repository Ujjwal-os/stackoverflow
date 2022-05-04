import jwt from 'jsonwebtoken'
import Users from '../models/user.js'
import bcrypt from 'bcryptjs'

export const signup = async (req,res) => {
    try{
        const {name,email,password,about,tags}=req.body;
        const fetchUser=await Users.findOne({email});
        if(fetchUser){
            return res.status(404).json({message:"User already Exists!"})
        }
        const hashPassword= await bcrypt.hash(password,12,(err,salt)=> salt)
        console.log("Happy to see yo");

        const newUser=await Users.create({name:name,email:email,about:about,tags:tags,password:hashPassword});
        console.log(newUser);
        const token = jwt.sign({email:newUser.email, id:newUser._id},"test",{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    } 
}


export const signin = async (req,res) => {
    try{
        const {email,password}=req.body;
        const fetchUser=await Users.findOne({email});
        if(!fetchUser){
            return res.status(404).json({message:"User doesn't Exists!"})
        }
        console.log(password,fetchUser.password);
        const isPassCrt= await bcrypt.compare(password,fetchUser.password,(err,result)=>result);
        if(!isPassCrt){
            return res.status(404).json({message:"Password Incorrect!"})
        }
        const token = jwt.sign({email:fetchUser.email, id:fetchUser._id},"test",{expiresIn:'1h'})
        res.status(200).json({result:fetchUser,token})
    }
    catch(err){

    }
}

