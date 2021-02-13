import { model, Schema, Document } from 'mongoose';

enum todoStatus {
    PENDING = 'Pending',
    INPROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    RESOLVED = 'Resolved',
    ARCHIVED = 'Archived',
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
            default: todoStatus.PENDING,
            required: true,
        },
    },
    { timestamps: true },
);

export default model<ITodo>('Todo', TodoSchema);
