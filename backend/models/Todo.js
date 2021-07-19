import mongoose from 'mongoose'
// import validator from 'validator'

const Schema = mongoose.Schema

const todoSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
          
    },
    { 
        collection: 'todos', 
        timestamps: true 
    }
)

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;