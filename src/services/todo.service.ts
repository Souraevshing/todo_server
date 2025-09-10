import {isValidObjectId} from "mongoose";

import { Todo, ITodo } from '../models/todo.model';
import { ICreateTodo } from '../interfaces/create-todo.interface';
import { IUpdateTodo } from '../interfaces/update-todo.interface';
import { normalizeTitleUtil } from '../utils/normalize-title.util';

/**
 * Create a new Todo document.
 *
 * @param payload An object containing the fields for the new Todo.
 * @returns The created Todo document.
 */
export async function createTodo(payload: ICreateTodo) {
  const normalizedTitle = normalizeTitleUtil(payload.title);
  const newTodo = new Todo({ ...payload, title: normalizedTitle });
  return await newTodo.save();
}

/**
 * Fetch all Todo documents from the database.
 *
 * @returns An array of Todo documents.
 */
export async function getTodos(): Promise<ITodo[]> {
  return Todo.find().sort({ createdAt: -1 });
}

/**
 * Fetch a single Todo by its unique identifier.
 *
 * @param id The Todo's MongoDB ObjectId as a string.
 * @returns The Todo document if found, or null.
 */
export async function getTodoById(id: string): Promise<ITodo | null> {
  return Todo.findById(id);
}

/**
 * Update a Todo by ID. Only the provided fields will be updated; missing
 * fields are ignored.
 *
 * @returns The updated Todo document if it exists, or null.
 * @param payload
 */
export async function updateTodo(payload: IUpdateTodo): Promise<ITodo | null> {
  const { id, updateFields } = payload;
  if (updateFields && (updateFields as any).title) {
    const title = (updateFields as any).title as string;
    (updateFields as any).title = normalizeTitleUtil(title);
  }
  return Todo.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
}

/**
 * Remove a Todo by ID.
 *
 * @param id The Todo's MongoDB ObjectId.
 * @returns The deleted Todo document if it was found and removed, or null.
 */
export async function deleteTodoById(id: string): Promise<ITodo | null> {
  return Todo.findByIdAndDelete(id);
}

/**
 * Idempotently set the `completed` flag on a Todo.
 * Defaults to true if not provided.
 */
export async function markTodoComplete(
    id: string,
    completed: boolean = true
): Promise<ITodo> {
    const {isValidObjectId} = await import('mongoose');

    if (!isValidObjectId(id)) {
        const err = new Error("Invalid todo id");
        (err as any).status = 400;
        throw err;
    }

    const updated = await Todo.findByIdAndUpdate(
        id,
        { $set: { completed } },
        { new: true, runValidators: true }
    );

    if (!updated) {
        const err = new Error("Todo not found");
        (err as any).status = 404;
        throw err;
    }

    return updated;
}
