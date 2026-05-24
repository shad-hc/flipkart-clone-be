import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const signup = async(req,res) => {
    try{
        const { name,email,password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            res.json({
                message : "User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        userModel.create({
            name,
            email,
            password :hashedPassword
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

export const signin = async (req,res) => {
    try{
        const { name,email,password } = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            res.json({
                message : "user does not exist,please signup first"
            })
            return;
        }
        const hashedPassword = user.password;
        const passMatch = await bcrypt.compare(password,hashedPassword);
        if(!passMatch){
            throw new Error("incorrect password");
        }

        const userId = user._id;
        const token = jwt.sign({ userId },process.env.USER_JWT_SECRET,{expiresIn : "7d"});
        res.cookie("token",token);
        res.json({
            message  :"signin succesfull"
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

export const logout = async (req,res) => {
    res.clearCookie();
    res.json({
        message : "logged out succesfully"
    })
}

