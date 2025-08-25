import mongoose from "mongoose";

export interface Todo {
    title : string;
    completed : boolean;
    created_by:mongoose.Types.ObjectId;
    createdAt ?: Date;
    updatedAt ?: Date;
}

const todoSchema = new mongoose.Schema<Todo>(
    {
        title:{
            type : String,
            required : true,
            trim:true,
        },
        completed:{
            type : Boolean,
            required:true,
            default:false,
        },
        created_by:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const TodoModel =mongoose.model<Todo>("Todo",todoSchema)