import User, { IUser } from '../models/user';
import Todo, { ITodo } from '../models/todo';
// (parent, arg, context, info)

export default {
    Query: {
        userbyEmail: async (parent: void, { email }: { email: string }): Promise<IUser | null> =>
            await User.findOne({ email }),
        userbyUid: async (parent: void, { uid }: { uid: string }): Promise<IUser | null> =>
            await User.findOne({ uid }),
    },
    User: {
        todo: async (parent: IUser): Promise<ITodo[] | null> =>
            await Todo.find({ uid: parent.uid }),
    },
    Mutation: {
        createUser: async (parent: void, { user }: { user: IUser }): Promise<IUser> => {
            console.log('kyle_debug ~ file: resovlers.ts ~ line 10 ~ createUser: ~ user', user);
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
