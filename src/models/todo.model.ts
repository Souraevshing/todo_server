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

const normalize = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
todoSchema.add({
    title: { type: String, required: true, index: true, unique: true },
});

todoSchema.pre('save', function (next) {
    this.title = normalize(this.title);
    next();
});

todoSchema.pre('findOneAndUpdate', function (next) {
    const update: any = this.getUpdate() || {};
    if (update.title) update.title = normalize(update.title);
    next();
});

export const Todo = model<ITodo>('Todo', todoSchema);
