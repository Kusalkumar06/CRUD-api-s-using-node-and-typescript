import type { Request,Response } from "express"
import { TodoModel } from "../models/todoModel.js"

export const getTodos = async (req : Request, res: Response) => {
    try {
        const todos = await TodoModel.find()
        res.status(200).json(todos)
    } catch(err){
        res.status(500).json({
            error : `Something went wrong: ${err}`,
        })
    }
}

export const createTodo = async (req : Request, res: Response) => {
    try{
        const {title,completed} = req.body
        if (!title || typeof(title) !== "string"){
            res.status(400).json({
                message: "Please provide a non empty title or string."
            })
        } else {
            const todo = await TodoModel.create({title,completed})
            res.status(201).json(todo);
        }
    }
    catch (err){
        res.status(500).json({
            error: `Something went wrong ${err}`
        })
    }
}   

export const specificTodo = async (req : Request, res: Response) => {
    try{
        const {id} = req.params
        const todo = await TodoModel.findById({_id: id})
        if (!todo){
            res.status(401).json({
                message: "Todo Id is not valid"
            })
        }
        res.status(200).json(todo)
    }
    catch (err){
        res.status(500).json({
            error: `Something went wrong ${err}`
        })
    }
} 

export const updateTodo = async (req : Request, res: Response) => {
    try{
        const {title,completed} = req.body
        const todo = await TodoModel.findByIdAndUpdate(req.params.id,{title,completed},{new : true})
        if (!todo){
            res.status(401).json({
                message:"Todo not found."
            })
        } else {
            res.status(201).json({
                message:"Todo updated successfully.",
                todo
            })
        }
    }
    catch (err){
        res.status(500).json({
            error: `Something went wrong ${err}`
        })
    }
}   

export const deleteTodo = async (req : Request, res: Response) => {
    try{
        const todo = await TodoModel.findByIdAndDelete(req.params.id)
        if (!todo){
            res.status(401).json({
                message:"Todo not found."
            })
        } else {
            res.status(201).json({
                message:"Todo deleted successfully.",
                todo
            })
        }
    }
    catch (err){
        res.status(500).json({
            error: `Something went wrong ${err}`
        })
    }
}   