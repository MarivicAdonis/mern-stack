import Todo from '../models/Todo.js'
import asyncHandler from 'express-async-handler'
import AppError  from '../utils/apperror.js'


// @desc create new todo item
// @route POST /api/todos
// @access Private returns the inserted data

const createTodo = asyncHandler( async (req, res, next) => {
    const content = req.body.content
    const owner = req.body.owner

    const todo = await Todo.create({
        content,
        owner,
    })

    if(todo){
        res.status(201)
        .json({
            _id: todo._id,
            content: todo.content,
        })
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

const getTodos = asyncHandler( async (req, res, next)=>{

    const owner = req.params.owner

    const todos = await Todo.find({
        owner: owner
    })


    if(todos){
        res.status(201)
        .json(todos)
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
    
})

const deleteTodo = asyncHandler( async (req, res, next)=>{
    const id = req.params.id
    const owner = req.params.owner

    const todo = await Todo.findById(id)

    if(todo){
        todo.delete()
        res.status(201)
        res.json({
            message: "Item successfully deleted"
        })
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

export {
    createTodo,
    getTodos,
    deleteTodo
};



