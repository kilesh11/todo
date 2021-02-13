import React, { Fragment, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios';
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
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    Chip,
    ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { auth } from '../Utility/firebase';
import { useAuth } from '../Context/AuthContext';
// import { wrapper } from '../Utility/common';
import {
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    Todo,
    TodoStatus,
    useGetTodoByUidQuery,
    refetchGetTodoByUidQuery,
} from '../generated/graphql';

const genColor = (status: TodoStatus) => {
    switch (status) {
        case TodoStatus.Pending:
            return '#5bc0de';
        case TodoStatus.Inprogress:
            return '#651fff';
        case TodoStatus.Completed:
            return '#5cb85c';
        case TodoStatus.Resolved:
            return '#f0ad4e';
        case TodoStatus.Archived:
            return '#4E3C36';
    }
};

const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: '#E98074',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#E98074',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E98074',
            },
            '&:hover fieldset': {
                borderColor: '#F56A57',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#E98074',
            },
        },
    },
});

const MainApp = () => {
    const { user } = useAuth();
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useImmer(false);
    const [mode, setMode] = useImmer('create');
    const [todo, setTodo] = useImmer<Todo>({
        uid: user?.uid ?? '',
        id: '',
        title: '',
        description: '',
        status: TodoStatus.Pending,
    });

    const [createTodoMutation] = useCreateTodoMutation();
    const [deleteTodoMutation] = useDeleteTodoMutation();
    const [updateTodoMutation] = useUpdateTodoMutation();
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

    // const testAuth = async () => {
    //     const token = user && (await user.getIdToken());
    //     const { data } = await wrapper(
    //         axios.get('/ui/verify', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }),
    //     );
    //     if (data.data.success) {
    //         setUid(data.data.uid);
    //     }

    // };

    const resetTodo = useCallback(() => {
        setTodo(() => ({
            uid: user?.uid ?? '',
            id: '',
            title: '',
            description: '',
            status: TodoStatus.Pending,
        }));
    }, [setTodo, user]);

    const keyPress = useCallback(
        async (e: React.KeyboardEvent<HTMLDivElement>) => {
            const { id, ...todoInput } = todo;
            if (e.key === 'Enter' && todoInput.title !== '') {
                await createTodoMutation({
                    variables: { todo: todoInput },
                    awaitRefetchQueries: true,
                    refetchQueries: [refetchGetTodoByUidQuery({ uid: user?.uid })],
                });
                resetTodo();
            }
        },
        [createTodoMutation, todo, user, resetTodo],
    );

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
                    alignItems: 'center',
                    backgroundColor: '#EAE7DC',
                    overflow: 'auto',
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Create Todo"
                    variant="outlined"
                    autoFocus
                    value={todo.title}
                    spellCheck={false}
                    onKeyDown={keyPress}
                    classes={{
                        root: classes.root,
                    }}
                    style={{ top: '20%', width: '100%', maxWidth: '20vw', marginBottom: '10px' }}
                    onChange={(e) =>
                        setTodo((draft) => {
                            draft.title = e.target.value;
                        })
                    }
                />
                {/* <Button
                    onClick={() => {
                        setMode(() => 'create');
                        setDialogOpen(() => true);
                    }}
                    style={{ backgroundColor: '#E98074', marginBottom: '20px', top: '20%' }}
                >
                    <Typography style={{ color: 'white', fontSize: 20 }}>Add Todo</Typography>
                </Button> */}
                {(getTodoData?.getTodoByUid?.length ?? 0) > 0 && (
                    <List
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            maxWidth: '20vw',
                            top: '20%',
                        }}
                    >
                        {getTodoData?.getTodoByUid.map((todo, i) => (
                            <Fragment key={todo.id}>
                                {i !== 0 && <Divider component="li" />}
                                <ListItem alignItems="flex-start">
                                    <ListItemIcon
                                        style={{
                                            width: '100px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            paddingRight: '16px',
                                            marginTop: '0px',
                                        }}
                                    >
                                        <Chip
                                            style={{
                                                backgroundColor: genColor(todo.status),
                                                color: 'white',
                                            }}
                                            label={todo?.status}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        onClick={() => {
                                            setMode(() => 'update');
                                            setTodo(() => ({
                                                uid: todo?.uid ?? '',
                                                id: todo.id,
                                                title: todo?.title,
                                                description: todo?.description,
                                                status: todo?.status,
                                            }));
                                            setDialogOpen(() => true);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        primaryTypographyProps={{
                                            style: {
                                                fontWeight: 'bold',
                                            },
                                        }}
                                        primary={todo.title}
                                        secondary={
                                            todo.description !== '' && (
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    // className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    <pre style={{ fontFamily: 'inherit' }}>
                                                        {todo.description}
                                                    </pre>
                                                </Typography>
                                            )
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => {
                                                deleteTodoMutation({
                                                    variables: { id: todo.id },
                                                    // context,
                                                    awaitRefetchQueries: true,
                                                    refetchQueries: [
                                                        refetchGetTodoByUidQuery({
                                                            uid: user?.uid,
                                                        }),
                                                    ],
                                                });
                                            }}
                                        >
                                            <DeleteIcon style={{ color: '#E98074' }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                )}
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(() => false);
                        resetTodo();
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {mode === 'update' ? 'Update' : 'Create'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            fullWidth
                            value={todo.title}
                            spellCheck={false}
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
                            multiline
                            rows={4}
                            rowsMax={4}
                            value={todo.description}
                            spellCheck={false}
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
                                resetTodo();
                            }}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={todo.title === ''}
                            onClick={async () => {
                                if (mode === 'create') {
                                    const { id, ...todoInput } = todo;
                                    await createTodoMutation({
                                        variables: { todo: todoInput },
                                        awaitRefetchQueries: true,
                                        refetchQueries: [
                                            refetchGetTodoByUidQuery({ uid: user?.uid }),
                                        ],
                                    });
                                } else if (mode === 'update') {
                                    const { id, ...todoInput } = todo;
                                    await updateTodoMutation({
                                        variables: { id, todo: todoInput },
                                    });
                                }
                                setDialogOpen(() => false);
                                resetTodo();
                            }}
                            color="primary"
                        >
                            {mode === 'update' ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default MainApp;
