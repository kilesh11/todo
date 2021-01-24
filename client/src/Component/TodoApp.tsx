import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { auth } from '../Utility/firebase';
import { useAuth } from '../Context/AuthContext';
import { wrapper } from '../Utility/common';

const TodoApp = () => {
    const [count, setCount] = useState(0);
    const [uid, setUid] = useState('');
    const { user } = useAuth();
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
            <Typography style={{ fontSize: 60 }}>Hi {user?.email}</Typography>
            <Typography style={{ fontSize: 50 }}>
                Edit <code>src/App.tsx</code> and save to reload.
            </Typography>
            <Button
                onClick={() => {
                    setCount((prevCount) => prevCount + 1);
                }}
                style={{ backgroundColor: '#122d54' }}
            >
                <Typography style={{ color: 'white', fontSize: 40 }}>Press to increment</Typography>
            </Button>
            <Typography style={{ fontSize: 40 }}>{count}</Typography>
            <Button onClick={testAuth} style={{ backgroundColor: '#122d54' }}>
                <Typography style={{ color: 'white', fontSize: 40 }}>Test auth</Typography>
            </Button>
            <Typography style={{ fontSize: 40 }}>Uid: {uid}</Typography>
            <Button
                onClick={() => {
                    auth.signOut();
                }}
                style={{ backgroundColor: '#122d54' }}
            >
                <Typography style={{ color: 'white', fontSize: 40 }}>Press to Logout</Typography>
            </Button>
        </div>
    );
};

export default TodoApp;
