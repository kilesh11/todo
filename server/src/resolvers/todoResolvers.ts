import Todo, { ITodo } from '../models/todo';
import { IDataLoaderContext } from '../interface/IFirebase';
import { GraphQLDateTime } from 'graphql-iso-date';
import { AuthenticationError } from 'apollo-server-express';

export default {
    DateTime: GraphQLDateTime,
    TodoStatus: {
        PENDING: 'Pending',
        INPROGRESS: 'In Progress',
        COMPLETED: 'Completed',
        RESOLVED: 'Resolved',
        ARCHIVED: 'Archived',
    },
    Query: {
        hello: (): string => 'Hello World!',
        validateAuth: (parent: void, arg: void, context: IDataLoaderContext): string | null => {
            return context?.currentUser?.uid ?? null;
        },
        getTodoByUid: async (
            parent: void,
            { uid }: { uid: string },
            context: IDataLoaderContext,
        ): Promise<ITodo[]> => {
            if (!context?.currentUser && process.env.NODE_ENV === 'production') {
                throw new AuthenticationError('must authenticate');
            }
            // console.log(
            //     'kyle_debug ~ file: todoResolvers.ts ~ line 36 ~ getTodoByUid: ~ context?.currentUser',
            //     context?.currentUser?.email,
            // );
            const foundTodos = await Todo.find({ uid });
            return foundTodos;
        },
    },
    Mutation: {
        createTodo: async (
            parent: void,
            { todo }: { todo: ITodo },
            context: IDataLoaderContext,
        ): Promise<ITodo> => {
            if (!context?.currentUser && process.env.NODE_ENV === 'production') {
                throw new AuthenticationError('must authenticate');
            }
            // console.log(
            //     'kyle_debug ~ file: todoResolvers.ts ~ line 36 ~ createTodo: ~ context?.currentUser',
            //     context?.currentUser?.email,
            // );
            const newTodo = new Todo(todo);
            await newTodo.save();
            return newTodo;
        },
        updateTodo: async (
            parent: void,
            { id, todo }: { id: string; todo: ITodo },
            context: IDataLoaderContext,
        ): Promise<ITodo | null> => {
            if (!context?.currentUser && process.env.NODE_ENV === 'production') {
                throw new AuthenticationError('must authenticate');
            }
            // console.log(
            //     'kyle_debug ~ file: todoResolvers.ts ~ line 36 ~ updateTodo: ~ context?.currentUser',
            //     context?.currentUser?.email,
            // );
            const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
            return updatedTodo;
        },
        deleteTodo: async (
            parent: void,
            { id }: { id: string },
            context: IDataLoaderContext,
        ): Promise<ITodo | null> => {
            if (!context?.currentUser && process.env.NODE_ENV === 'production') {
                throw new AuthenticationError('must authenticate');
            }
            // console.log(
            //     'kyle_debug ~ file: todoResolvers.ts ~ line 36 ~ deleteTodo: ~ context?.currentUser',
            //     context?.currentUser?.email,
            // );
            const deletedTodo = await Todo.findByIdAndDelete(id);
            return deletedTodo;
        },
    },
};
