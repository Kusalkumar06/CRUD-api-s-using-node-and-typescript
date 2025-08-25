import type { Request,Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/userModel.js"
import "dotenv/config"

export const registerUser = async (req:Request,res:Response) => {
    const {username,email,password} = req.body;
    try{
        const existingUser = await UserModel.findOne({username})
        if (existingUser){
            return res.status(400).json({
                message:"User already exists.",
                error:true
            })
        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await UserModel.create({username,email,password:hashedPassword});
            res.status(201).json({
                message: "User registered Successfully",
                result: newUser,
                error:false
            })
        }
    }catch (err){
        res.status(500).json({
            error: `Something went wrong during registration ${err}`
        })
    }
}

export const loginUser = async (req:Request,res:Response) => {
    const {username,password} = req.body
    try{
        const existingUser = await UserModel.findOne({username});
        if (!existingUser){
            res.status(400).json({
                message: "User not registered yet."
            })
        } else{
            const isPasswordValid = await bcrypt.compare(password , existingUser.password)
            if (!isPasswordValid){
                res.status(400).json({
                    message: "Invalid Credinitials."
                })
            } else {
                const secret_code = process.env.SECRET_CODE
                const payload = {
                    username,
                    email : existingUser.email
                }
                const jwtToken = jwt.sign(payload,secret_code as string, {expiresIn: "1h"})
                res.status(200).json({
                    message: "Login Successfull",
                    token: jwtToken
                })
            }
        }
    } catch (err){
        res.status(500).json({
            error: `Something went wrong during authentication ${err}`
        })
    }
}