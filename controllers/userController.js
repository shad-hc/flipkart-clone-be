import { userModel } from "../models/user.js";
// import { cloudinary } from '../config/cloudinary.js';
import bcrypt from "bcrypt";

export const getMe = async (req,res) => {
    try{
        const userId = req.userId;
        const user = await userModel.findOne( userId );
        res.json({
            user
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

export const updateMe = async(req,res) => {
    try{
        const userId = req.userId;
        const { name,addresses } = req.body;
        const user = await userModel.findByIdAndUpdate(userId,{
            addresses,name},
            {new : true, runValidators : true});
            res.json({
                user
            })
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

export const updatePassword = async (req,res) => {
    try{
        const userId = req.userId;
        const { currentPassword,newPassword } = req.body;

        const user = await userModel.findOne(userId).select('+password');
        const isMatch = bcrypt.compare(currentPassword,user.password);
        if(!isMatch){
            res.json({
                message : "incorrect passowrd"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        user.save();
        res.json({
            message : "password changed succesfully"
        })
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

// admin only routes
export const getAllUsers = (req,res) => {
    try {
        const users = userModel.find();
        res.json({
            count : users.length,
            users
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}



