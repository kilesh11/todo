import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default model<IUser>('User', userSchema);
