import { Schema, model, Document, HydratedDocument, UpdateQuery } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  titleKey: string;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    titleKey: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  },
);

const normalize = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

todoSchema.pre('save', function (next) {
  this.title = normalize(this.title);
  next();
});

todoSchema.pre('validate', function (next) {
  const doc = this as HydratedDocument<ITodo>;
  if (doc.title) {
    doc.titleKey = normalize(doc.title);
  }
  next();
});

todoSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true });

  const update = this.getUpdate() as (UpdateQuery<ITodo> & { $set?: any }) | undefined;
  if (!update) return next();

  const nextTitle = (update.$set && (update.$set as any).title) ?? (update as any).title;

  if (typeof nextTitle === 'string') {
    const normalized = normalize(nextTitle);
    if (update.$set) (update.$set as any).titleKey = normalized;
    else (update as any).$set = { ...(update as any).$set, titleKey: normalized };
  }
  next();
});

todoSchema.index({ titleKey: 1 }, { unique: true });

export const Todo = model<ITodo>('Todo', todoSchema);
