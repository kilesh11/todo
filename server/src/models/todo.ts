import { model, Schema, Document } from 'mongoose';

enum todoStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Resolved = 'Resolved',
    Archived = 'Archived',
}

export interface ITodo extends Document {
    uid: string;
    title: string;
    description: string;
    status: todoStatus;
}

const TodoSchema: Schema<ITodo> = new Schema(
    {
        uid: {
            type: String,
            unique: true,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: Object.values(todoStatus),
            default: todoStatus.Pending,
            required: true,
        },
    },
    { timestamps: true },
);

export default model<ITodo>('Todo', TodoSchema);
