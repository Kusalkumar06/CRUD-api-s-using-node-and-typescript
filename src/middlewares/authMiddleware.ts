import type { NextFunction,Request,Response } from "express" 
import jwt from "jsonwebtoken"
import "dotenv/config"

interface AuthRequest extends Request{
    user ?: any

}

export const authenticate = async (req:AuthRequest, res:Response,next:NextFunction) =>{
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1]
    if (!token) {
        res.status(401).json({
            message:"No Token Provided"
        })
    }
    try{
        const secret_code = process.env.SECRET_CODE
        const verified = jwt.verify(token, secret_code)
        req.user = verified;
        next();
    } catch (err){
        res.status(401).json({
            message:"Invalid token",
        })
    }
}