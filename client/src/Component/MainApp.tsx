import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
// import TodoApp from './TodoApp';
import { auth } from '../Utility/firebase';
import { useAuth } from '../Context/AuthContext';
import { wrapper } from '../Utility/common';
import { useCreateTodoMutation, TodoInput, TodoStatus } from '../generated/graphql';

const MainApp = () => {
    const [count, setCount] = useState(0);
    const [uid, setUid] = useState('');
    const { user } = useAuth();
    const [todo, setTodo] = useState<TodoInput>({
        uid: user?.uid ?? '',
        title: 'testTitle',
        description: 'testDescription',
        status: TodoStatus.Pending,
    });
    console.log('kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ todo', todo);

    // const [createUserIfNotExist, { data, loading, error }] = useCreateUserIfNotExistMutation();
    // console.log('kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ error', error);
    // console.log('kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ loading', loading);
    // console.log(
    //     'kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ data',
    //     data?.createUserIfNotExist?.email,
    // );
    const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation();
    console.log('kyle_debug ~ file: MainApp.tsx ~ line 30 ~ MainApp ~ error', error);
    console.log('kyle_debug ~ file: MainApp.tsx ~ line 30 ~ MainApp ~ loading', loading);
    console.log(
        'kyle_debug ~ file: MainApp.tsx ~ line 30 ~ MainApp ~ data',
        new Date(data?.createTodo.createdAt),
    );

    // #F56A57
    // #4E3C36
    // #F7EADC

    // #EAE7DC
    // #DBC3A5
    // #4E3C36
    // #8E8D8A
    // #E98074
    // #E85A4F

    const testAuth = async () => {
        const token = user && (await user.getIdToken());
        const { data } = await wrapper(
            axios.get('/ui/verify', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
        );
        if (data.data.success) {
            setUid(data.data.uid);
        }
        // console.log('kyle_debug ~ file: Todo.tsx ~ line 24 ~ testAuth ~ data', data);
    };

    // useEffect(() => {
    //     (async () => {
    //         const token = user && (await user.getIdToken());
    //         createUserIfNotExist({
    //             variables: {
    //                 user: { uid: user?.uid, email: user?.email, name: user?.displayName ?? '' },
    //             },

    //             context: {
    //                 headers: {
    //                     authorization: `Bearer ${token}`,
    //                 },
    //             },
    //         });
    //     })();
    // }, [createUserIfNotExist, user]);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EAE7DC',
            }}
        >
            <Typography style={{ fontSize: 30 }}>Hi {user?.email}</Typography>
            <Typography style={{ fontSize: 20 }}>
                Edit <code>src/App.tsx</code> and save to reload.
            </Typography>
            <Button
                onClick={() => {
                    setCount((prevCount) => prevCount + 1);
                }}
                style={{ backgroundColor: '#122d54' }}
            >
                <Typography style={{ color: 'white', fontSize: 20 }}>Press to increment</Typography>
            </Button>
            <Typography style={{ fontSize: 20 }}>{count}</Typography>
            <Button onClick={testAuth} style={{ backgroundColor: '#122d54' }}>
                <Typography style={{ color: 'white', fontSize: 20 }}>Test auth</Typography>
            </Button>
            <Typography style={{ fontSize: 20 }}>Uid: {uid}</Typography>
            <Button
                onClick={() => {
                    auth.signOut();
                }}
                style={{ backgroundColor: '#122d54', marginBottom: '20px' }}
            >
                <Typography style={{ color: 'white', fontSize: 20 }}>Press to Logout</Typography>
            </Button>
            <Button
                onClick={async () => {
                    const token = await user?.getIdToken();
                    createTodoMutation({
                        variables: { todo },
                        context: {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        },
                    });
                }}
                style={{ backgroundColor: '#122d54', marginBottom: '20px' }}
            >
                <Typography style={{ color: 'white', fontSize: 20 }}>Add Todo</Typography>
            </Button>
            {/* <TodoApp /> */}
        </div>
    );
};

export default MainApp;
