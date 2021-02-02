import {
    createContext,
    useContext,
    useState,
    useEffect,
    FunctionComponent,
    // Dispatch,
    // useCallback,
} from 'react';
// import { useHistory } from 'react-router-dom';
// import { auth, provider } from '../Utility/firebase';
// import { wrapper } from '../Utility/common';
// import firebase from 'firebase/app';
// import axios from 'axios';

enum todoStatus {
    PENDING = 'Pending',
    INPROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    RESOLVED = 'Resolved',
    ARCHIVED = 'Archived',
}

interface ITodo {
    uid: string;
    title: string;
    description: string;
    status: todoStatus;
}

interface ITodoContext {
    todoList: ITodo[];
    createTodo: (uid: string, todo: ITodo) => void;
    updateTodo: (id: string, todo: ITodo) => void;
    deleteTodo: (id: string) => void;
}

const TodoContext = createContext<ITodoContext>({
    todoList: [],
    createTodo: () => null,
    updateTodo: () => null,
    deleteTodo: () => null,
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider: FunctionComponent = ({ children }) => {
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    console.log('kyle_debug ~ file: TodoContext.tsx ~ line 51 ~ setTodoList', setTodoList);

    const createTodo = (uid: string, todo: ITodo) => {
        console.log('created Todo!');
    };
    const updateTodo = (id: string, todo: ITodo) => {
        console.log('created Todo!');
    };
    const deleteTodo = (id: string) => {
        console.log('created Todo!');
    };

    useEffect(() => {}, []);

    return (
        <TodoContext.Provider value={{ todoList, createTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
