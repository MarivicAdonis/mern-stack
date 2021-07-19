import express from "express";
import {
    createTodo,
    getTodos,
    deleteTodo
} from '../controllers/todoController.js'


const router = express.Router()

router
.route('/')
.post( createTodo)

router.
get('/:owner', getTodos)

router.delete('/:id&:owner', deleteTodo)





export default router