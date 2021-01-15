import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useAuth } from '../Context/AuthContext';

const Todo = () => {
    const [count, setCount] = useState(0);
    const { logout } = useAuth();
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
            <Button onClick={logout} style={{ backgroundColor: '#122d54' }}>
                <Typography style={{ color: 'white', fontSize: 40 }}>Press to Logout</Typography>
            </Button>
        </div>
    );
};

export default Todo;
