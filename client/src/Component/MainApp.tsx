import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import axios from 'axios';
import {
    AppBar,
    Button,
    Typography,
    Toolbar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
    const [dialogOpen, setDialogOpen] = useImmer(false);
    const [todo, setTodo] = useImmer<TodoInput>({
        uid: user?.uid ?? '',
        title: '',
        description: '',
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
        // loading: getTodoLoading,
        // error: getTodoError,
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
        <>
            <AppBar position="static" style={{ backgroundColor: '#F56A57' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Hi {user?.email}
                    </Typography>
                    <Button
                        onClick={() => {
                            auth.signOut();
                        }}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <Typography style={{ color: 'white', fontSize: 20 }}>Logout</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <div
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EAE7DC',
                    overflow: 'auto',
                }}
            >
                <Button onClick={testAuth} style={{ backgroundColor: '#E98074' }}>
                    <Typography style={{ color: 'white', fontSize: 20 }}>Test auth</Typography>
                </Button>
                <Typography style={{ fontSize: 20 }}>Uid: {uid}</Typography>
                <Button
                    onClick={() => setDialogOpen(() => true)}
                    style={{ backgroundColor: '#E98074', marginBottom: '20px' }}
                >
                    <Typography style={{ color: 'white', fontSize: 20 }}>Add Todo</Typography>
                </Button>
                {getTodoData?.getTodoByUid.map((todo) => (
                    <span
                        style={{
                            background: 'white',
                            margin: '10px 0px',
                            padding: '5px 15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        key={todo.id}
                    >
                        <Typography style={{ fontSize: 20, paddingRight: 20 }}>
                            Title: {todo.title}
                        </Typography>
                        <Typography style={{ fontSize: 20, paddingRight: 20 }}>
                            Description: {todo.description}
                        </Typography>
                        <Typography style={{ fontSize: 20, paddingRight: 20 }}>
                            status: {todo.status}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                deleteTodoMutation({
                                    variables: { id: todo.id },
                                    // context,
                                    awaitRefetchQueries: true,
                                    refetchQueries: [refetchGetTodoByUidQuery({ uid: user?.uid })],
                                });
                            }}
                        >
                            <DeleteIcon style={{ color: '#E98074' }} />
                        </IconButton>
                    </span>
                ))}
                {/* <TodoApp /> */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(() => false);
                        setTodo(() => ({
                            uid: user?.uid ?? '',
                            title: '',
                            description: '',
                            status: TodoStatus.Pending,
                        }));
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            fullWidth
                            value={todo.title}
                            onChange={(e) =>
                                setTodo((draft) => {
                                    draft.title = e.target.value;
                                })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            fullWidth
                            value={todo.description}
                            onChange={(e) =>
                                setTodo((draft) => {
                                    draft.description = e.target.value;
                                })
                            }
                        />
                        <FormControl fullWidth style={{ margin: '20px 0px' }}>
                            <InputLabel shrink id="todoStatus">
                                Status
                            </InputLabel>
                            <Select
                                labelId="todoStatus"
                                id="todoStatus"
                                value={todo.status}
                                onChange={(e) =>
                                    setTodo((draft) => {
                                        draft.status = e.target.value as TodoStatus;
                                    })
                                }
                            >
                                {Object.values(TodoStatus).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status.toString()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setDialogOpen(() => false);
                                setTodo(() => ({
                                    uid: user?.uid ?? '',
                                    title: '',
                                    description: '',
                                    status: TodoStatus.Pending,
                                }));
                            }}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={todo.title === ''}
                            onClick={async () => {
                                await createTodoMutation({
                                    variables: { todo },
                                    // context,
                                    awaitRefetchQueries: true,
                                    refetchQueries: [refetchGetTodoByUidQuery({ uid: user?.uid })],
                                });
                                setDialogOpen(() => false);
                                setTodo(() => ({
                                    uid: user?.uid ?? '',
                                    title: '',
                                    description: '',
                                    status: TodoStatus.Pending,
                                }));
                            }}
                            color="primary"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default MainApp;
