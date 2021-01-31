import Todo, { ITodo } from '../models/todo';
import admin from '../config/firebase';
import { ExpressContext } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';

interface IFirebaseContext extends ExpressContext {
    currentUser?: admin.auth.DecodedIdToken;
}

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
        validateAuth: (parent: void, arg: void, context: IFirebaseContext): string | null => {
            return context?.currentUser?.uid ?? null;
        },
        getTodoByUid: async (parent: void, { uid }: { uid: string }): Promise<ITodo[]> => {
            const foundTodos = await Todo.find({ uid });
            return foundTodos;
        },
    },
    Mutation: {
        createTodo: async (parent: void, { todo }: { todo: ITodo }): Promise<ITodo> => {
            const newTodo = new Todo(todo);
            await newTodo.save();
            return newTodo;
        },
        updateTodo: async (
            parent: void,
            { id, todo }: { id: string; todo: ITodo },
        ): Promise<ITodo | null> => {
            const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
            return updatedTodo;
        },
        deleteTodo: async (parent: void, { id }: { id: string }): Promise<ITodo | null> => {
            const deletedTodo = await Todo.findByIdAndDelete(id);
            return deletedTodo;
        },
    },
};
