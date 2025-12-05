import express  from "express"
import { addTodo, allTodo,todoStatusUpdate,deleteToDo } from "../controllers/todo.js"
import {auth} from "../middleware/auth.js"
import { validataRegister } from "../middleware/validation.js"
import { createTodoSchema } from "../schema/todo.schema.js"

const todoRouter = express.Router()

todoRouter.post('/addTodo',validataRegister(createTodoSchema),auth,addTodo)
todoRouter.get('/allTodo',auth,allTodo)
todoRouter.patch('/todoStatusUpdate/:id',auth,todoStatusUpdate)
todoRouter.delete('/deleteToDo/:id',auth,deleteToDo)

export default todoRouter