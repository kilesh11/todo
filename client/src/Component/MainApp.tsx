import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
// import TodoApp from './TodoApp';
import { auth } from '../Utility/firebase';
import { useAuth } from '../Context/AuthContext';
import { wrapper } from '../Utility/common';
import {
    useCreateTodoMutation,
    useDeleteTodoMutation,
    TodoInput,
    TodoStatus,
    useGetTodoByUidQuery,
    refetchGetTodoByUidQuery,
} from '../generated/graphql';

const MainApp = () => {
    const [uid, setUid] = useState('');
    const { user } = useAuth();
    const [todo, setTodo] = useState<TodoInput>({
        uid: user?.uid ?? '',
        title: 'testTitle',
        description: 'testDescription',
        status: TodoStatus.Pending,
    });

    // const [createUserIfNotExist, { data, loading, error }] = useCreateUserIfNotExistMutation();
    // console.log('kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ error', error);
    // console.log('kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ loading', loading);
    // console.log(
    //     'kyle_debug ~ file: MainApp.tsx ~ line 16 ~ MainApp ~ data',
    //     data?.createUserIfNotExist?.email,
    // );
    const [createTodoMutation] = useCreateTodoMutation();
    const [deleteTodoMutation] = useDeleteTodoMutation();
    const {
        data: getTodoData,
        loading: getTodoLoading,
        error: getTodoError,
    } = useGetTodoByUidQuery({
        skip: !user,
        variables: {
            uid: user?.uid,
        },
    });

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
    //     // (async () => {
    //     //     const token = user && (await user.getIdToken());
    //     //     getTodoByUidLazyQuery({
    //     //         variables: {
    //     //             uid: user?.uid,
    //     //         },
    //     //         context: {
    //     //             headers: {
    //     //                 authorization: `Bearer ${token}`,
    //     //             },
    //     //         },
    //     //     });
    //     // })();
    //     getTodoByUidLazyQuery({
    //         variables: {
    //             uid: user?.uid,
    //         },
    //         // context: {
    //         //     headers: {
    //         //         authorization: `Bearer ${token}`,
    //         //     },
    //         // },
    //     });
    // }, [getTodoByUidLazyQuery, user]);

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
            <Typography style={{ fontSize: 20 }}>{user?.email}</Typography>
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
                onClick={() => {
                    // const context = {
                    //     headers: {
                    //         authorization: `Bearer ${await user?.getIdToken()}`,
                    //     },
                    // };
                    createTodoMutation({
                        variables: { todo },
                        // context,
                        awaitRefetchQueries: true,
                        refetchQueries: [refetchGetTodoByUidQuery({ uid: user?.uid })],
                    });
                }}
                style={{ backgroundColor: '#122d54', marginBottom: '20px' }}
            >
                <Typography style={{ color: 'white', fontSize: 20 }}>Add Todo</Typography>
            </Button>
            {getTodoData?.getTodoByUid.map((todo) => (
                <span
                    style={{ background: 'white', margin: '10px 0px', padding: '5px 15px' }}
                    key={todo.id}
                >
                    <Typography style={{ fontSize: 20 }}>Title: {todo.title}</Typography>
                    <Typography style={{ fontSize: 20 }}>
                        Description: {todo.description}
                    </Typography>
                    <Typography style={{ fontSize: 20 }}>status: {todo.status}</Typography>
                    <Button
                        onClick={() => {
                            // const context = {
                            //     headers: {
                            //         authorization: `Bearer ${await user?.getIdToken()}`,
                            //     },
                            // };
                            deleteTodoMutation({
                                variables: { id: todo.id },
                                // context,
                                awaitRefetchQueries: true,
                                refetchQueries: [refetchGetTodoByUidQuery({ uid: user?.uid })],
                            });
                        }}
                        style={{ backgroundColor: '#122d54', marginBottom: '20px' }}
                    >
                        <Typography style={{ color: 'white', fontSize: 20 }}>Delete</Typography>
                    </Button>
                </span>
            ))}
            {/* <TodoApp /> */}
        </div>
    );
};

export default MainApp;
