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

export const todoAddReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_ADD_REQUEST:
            return { loading: true }
        case TODO_ADD_SUCCESS:
            return { loading: false, success: true, todoList: action.payload }
        case TODO_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const todoListReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_LIST_REQUEST:
            return { loading : true };
        case TODO_LIST_SUCCESS:
            return { loading: false, success: true, todoListData: action.payload }
        case TODO_LIST_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}

export const todoDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_DELETE_REQUEST:
            return { loading : true }
        case TODO_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TODO_DELETE_FAIL:
            return { error: action.payload }
        default:
            return state;
    }
}