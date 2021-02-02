import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
// import TodoApp from './TodoApp';
import { auth } from '../Utility/firebase';
import { useAuth } from '../Context/AuthContext';
import { wrapper } from '../Utility/common';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER_IF_NOT_EXIST = gql`
    mutation CREATE_USER_IF_NOT_EXIST($newUser: UserInput!) {
        createUserIfNotExist(user: $newUser) {
            uid
            email
            name
        }
    }
`;

const MainApp = () => {
    const [count, setCount] = useState(0);
    const [uid, setUid] = useState('');
    const { user } = useAuth();

    const [createUserIfNotExist] = useMutation(CREATE_USER_IF_NOT_EXIST);
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
        console.log('kyle_debug ~ file: Todo.tsx ~ line 24 ~ testAuth ~ data', data);
    };

    useEffect(() => {
        (async () => {
            const token = user && (await user.getIdToken());
            createUserIfNotExist({
                variables: {
                    newUser: { uid: user?.uid, email: user?.email, name: user?.displayName ?? '' },
                },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            });
        })();
    }, [createUserIfNotExist, user]);

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
            {/* <TodoApp /> */}
        </div>
    );
};

export default MainApp;
