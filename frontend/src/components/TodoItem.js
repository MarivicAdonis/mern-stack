import React, { useEffect, useState } from 'react';
import { deleteTodo, getTodoList } from '../actions/todoActions.js';
import { useDispatch } from 'react-redux';


const Item = (props) => {

  const dispatch = useDispatch()

  const [itemData, setItemData] = useState(props.data)


  const submitHandler = (e) => {
    e.preventDefault();
    props.ondelete()
  }

  return (
    <form className='border rounded-1 row my-2 p-2' onSubmit={submitHandler}>
        <p className='col'>{ itemData.content }</p>
        <button type='submit' className='btn btn-danger col-auto btn-sm'>done</button>
    </form>
    
  );
};

export default Item;
