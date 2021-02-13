import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    uid: string;
    email: string;
    name: string;
}

const UserSchema: Schema<IUser> = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
});

export default model<IUser>('User', UserSchema);
