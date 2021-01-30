import User, { IUser } from '../models/user';
import { ITodo } from '../models/todo';
import { IDataLoaderContext } from '../interface/firebase';
// (parent, arg, context, info)

export default {
    Query: {
        userbyEmail: async (parent: void, { email }: { email: string }): Promise<IUser | null> =>
            await User.findOne({ email }),
        userbyUid: async (parent: void, { uid }: { uid: string }): Promise<IUser | null> =>
            await User.findOne({ uid }),
        getAllUser: async (): Promise<IUser[] | null> => await User.find(),
    },
    User: {
        todos: async (parent: IUser, arg: void, ctx: IDataLoaderContext): Promise<ITodo[] | null> =>
            ctx.dataLoaders.todoLoader.load(parent.uid),
    },
    Mutation: {
        createUser: async (parent: void, { user }: { user: IUser }): Promise<IUser> => {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        },
        createUserIfNotExist: async (
            parent: void,
            { user }: { user: IUser },
        ): Promise<IUser | null | void> => {
            const query = { uid: user.uid };
            const update = {
                $setOnInsert: user,
            };
            const options = { new: true, upsert: true };
            const newUser = await User.findOneAndUpdate(query, update, options).catch((error) =>
                console.error(error),
            );
            return newUser;
        },
    },
};
