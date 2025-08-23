import { Router } from "express";
import { getTodos,createTodo,specificTodo,updateTodo,deleteTodo } from "../controllers/todoControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const route = Router()

route.get("/", authenticate,getTodos)

route.post("/post/",authenticate,createTodo)

route.get("/:id",authenticate, specificTodo)

route.put ("/put/:id",authenticate,updateTodo)

route.delete("/delete/:id",authenticate,deleteTodo)

export default route