import {
    TODO_ADD_REQUEST,
    TODO_ADD_SUCCESS,
    TODO_ADD_FAIL,
    TODO_LIST_REQUEST,
    TODO_LIST_SUCCESS,
    TODO_LIST_FAIL,
    TODO_DELETE_REQUEST,
    TODO_DELETE_SUCCESS,
    TODO_DELETE_FAIL,
} from '../constants/todoConstants.js'
import { useSelector } from 'react-redux'

import axios from 'axios'
export const addTodo = (content) => async ( dispatch, getState ) => {
    
    try {

        const userInfo = getState().userLogin.userInfo

        dispatch({
            type: TODO_ADD_REQUEST
        })

        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/todos',
            {
                content,
                owner: userInfo._id,
                user: userInfo,
                config
            }
        )

        dispatch({
            type: TODO_ADD_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
          type: TODO_ADD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    
}

export const getTodoList = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: TODO_LIST_REQUEST
        })

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };

        const {
            userLogin: {userInfo}
        } = getState()

        const { data } = await axios.get(`/api/todos/${userInfo._id}`, config)

        dispatch({
            type: TODO_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TODO_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteTodo  = (todoData) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: TODO_DELETE_REQUEST
        })

        const { _id, owner } = todoData

        const { 
            todoList : {
                todoListData
            }
        } = getState()

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };

        const { data, status } = await axios.delete(
            `/api/todos/${_id}&${owner}`
        )

        if(status == 201){
            todoListData.splice(todoListData.indexOf(todoData), 1)
            dispatch({
                type: TODO_DELETE_SUCCESS,
            })
        }


    } catch (error) {
        dispatch({
            type: TODO_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }

}