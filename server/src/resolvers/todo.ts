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
    Todo: {
        description: (parent: ITodo): string => `override todo description ${parent.description}`,
    },
    Query: {
        hello: (): string => 'Hello World!',
        validateAuth: (parent: void, arg: void, context: IFirebaseContext): string | null => {
            return context?.currentUser?.uid ?? null;
        },
    },
    Mutation: {
        createTodo: async (parent: void, { todo }: { todo: ITodo }): Promise<ITodo> => {
            console.log('kyle_debug ~ file: resovlers.ts ~ line 10 ~ createUser: ~ user', todo);
            const newTodo = new Todo(todo);
            await newTodo.save();
            return newTodo;
        },
        updateTodo: async (
            parent: void,
            { _id, todo }: { _id: string; todo: ITodo },
        ): Promise<ITodo | null> => {
            console.log('kyle_debug ~ file: resovlers.ts ~ line 10 ~ createUser: ~ user', todo);
            const updatedTodo = await Todo.findByIdAndUpdate(_id, todo, { new: true });
            return updatedTodo;
        },
    },
};
