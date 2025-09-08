import {FilterQuery} from "mongoose";

import {ITodo, Todo} from "../models/todo.model";

export async function existsByTitle(normalizedTitle: string, excludeId?: string): Promise<boolean> {
    const query: FilterQuery<ITodo> = { title: normalizedTitle } as any;
    if (excludeId) {
        (query as any)._id = { $ne: excludeId };
    }
    const existing = await Todo.findOne(query).collation({ locale: "en", strength: 2 });
    return !!existing;
}
