// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Typography } from '@material-ui/core';
// import { auth } from '../Utility/firebase';
// import { useAuth } from '../Context/AuthContext';
// import { wrapper } from '../Utility/common';
import { TodoProvider, useTodo } from '../Context/TodoContext';

const TodoApp = () => {
    const { todoList } = useTodo();
    console.log('kyle_debug ~ file: TodoApp.tsx ~ line 14 ~ TodoApp ~ todoList', todoList);
    // #F56A57
    // #4E3C36
    // #F7EADC

    // #EAE7DC
    // #DBC3A5
    // #4E3C36
    // #8E8D8A
    // #E98074
    // #E85A4F

    return (
        <TodoProvider>
            <div
                style={{
                    width: '20vw',
                    height: '20vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E85A4F',
                }}
            >
                test
            </div>
        </TodoProvider>
    );
};

export default TodoApp;
