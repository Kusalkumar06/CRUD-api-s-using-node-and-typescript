import type { NextFunction,Request,Response } from "express" 
import jwt from "jsonwebtoken"
import "dotenv/config"
import { UserModel } from "../models/userModel.js"
import type { JwtPayload } from "jsonwebtoken";


interface AuthRequest extends Request{
    user?: {
    user_id: string;
    username: string;
  };
}

interface TokenPayload extends JwtPayload {
  username: string;
}

export const authenticate = async (req:AuthRequest, res:Response,next:NextFunction) =>{
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            message:"No Token Provided"
        })
    }
    try{
        const secret_code = process.env.SECRET_CODE
        if (!secret_code)  {
           return res.status(500).json({ message: "Server misconfiguration" })
        }
        const verified = jwt.verify(token, secret_code) as TokenPayload
        const userDetails = await UserModel.findOne({username: verified.username} )
        if (!userDetails){
          return res.status(400).json({
                message:"User not found."
            })
        }
        req.user = {user_id : userDetails._id.toString() , username: userDetails.username}
        next();
    } catch (err){
        res.status(401).json({
            message:"Invalid token",
        })
    }
}