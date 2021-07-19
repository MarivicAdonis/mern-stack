import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';

import Item from '../components/TodoItem';
import { addTodo, deleteTodo, getTodoList } from '../actions/todoActions.js'
import e from 'cors';

const Todo = ({ history }) => {

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const deleteHandler = async (item) => {
        await dispatch(deleteTodo(item))
        await dispatch(getTodoList())
    }

    const [todoContent, setTodoContent] = useState('')
    const content = ''

    const addHandler = async () => {
        if(todoContent){
            await dispatch(addTodo(todoContent))
            dispatch(getTodoList())
            setTodoContent('')
        }
    }

    // loaders
    const todoDeleteLoading = useSelector((state)=>state.todoDelete.loading)
    const todoDeleteLoader = todoDeleteLoading && 
    (<div className='row'>
        <label className='col'>Deleting </label>
        <Loader className='col' />
    </div> )

    const todoAddLoading = useSelector((state)=> state.todoAdd.loading)
    const todoAddLoader = todoAddLoading && 
    (<div className='row'>
        <label className='col'>Adding </label>
        <Loader className='col' />
    </div> )

    const todoListLoading = useSelector((state)=>state.todoList.loading)
    const todoListLoader = todoListLoading && 
    (<div className='row'>
        <label className='col'>Preparing your to do list </label>
        <Loader className='col' />
    </div> )
    

    useEffect(() => {
        if (!userInfo) {
          history.push('/login');
        } else { 
            // dispatch(addTodo("todo 1"))
            // dispatch(addTodo("todo 2"))
            // dispatch(addTodo("todo 3"))
            // dispatch(addTodo("todo 4"))
            // dispatch(addTodo("todo 5"))
            // dispatch(addTodo("todo 6"))
            dispatch(getTodoList())
        }
    }, [dispatch, history, userInfo, user]);

    const todoListData = useSelector((state)=>state.todoList.todoListData)

    const listItems = todoListData  ?  todoListData.map((val,i) => {
        return (
            <div className='border rounded-1 row my-2 p-2' key={val._id}>
                <p className='col'>{ val.content }</p>
                <button type='button' onClick={()=>deleteHandler(val)} className='btn btn-danger col-auto btn-sm'>done</button>
            </div>
        )
        // <Item key={val._id} data={val} ondelete = {deleteHandler(val)} />
    }) : ''

    

    return (
        <div className='col-9 mx-auto'>
            {todoDeleteLoader}
            {todoAddLoader}
            <div className='row my-3'>
                <input type="textarea" controlId='content' value={todoContent} onChange={(e) => setTodoContent(e.target.value)} className='col form-control me-3' placeholder='write anything' />
                <button type='button' className='btn btn-primary col-auto' onClick={addHandler}>Add</button>
            </div>
            <div className='row mb-3' >
                <h1 className='col'>To do List</h1>
            </div>
            {todoListLoader}
            <div>
                {listItems}
            </div>
        </div>
    );
};

export default Todo;
