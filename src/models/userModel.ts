import mongoose from "mongoose";

export interface User {
    username : string;
    email : string;
    password : string;
}

const userSchema = new mongoose.Schema<User>(
    {
      username :{
        type: String,
        required: true,
        unique:true
      },
      email:{
        type: String,
        required: true,
        unique:true
      },
      password:{  // Hashed Password
        type: String,
        required: true
      }  
    },
)

export const UserModel = mongoose.model<User>("Users",userSchema)