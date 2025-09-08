import { Schema, model, Document } from 'mongoose'

export interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        completed: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
)

export const Todo = model<ITodo>('Todo', todoSchema);
