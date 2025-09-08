import {FilterQuery} from 'mongoose'

import {Todo,ITodo} from '../models/todo.model'

export function normalizeTitle(title: string): string {
    return title.trim().replace(/\s+/g, ' ');
}

async function existsByTitle(normalizedTitle: string, excludeId?: string): Promise<boolean> {
    const query: FilterQuery<ITodo> = { title: normalizedTitle } as any;
    if (excludeId) {
        (query as any)._id = { $ne: excludeId };
    }
    const existing = await Todo.findOne(query).collation({ locale: "en", strength: 2 });
    return !!existing;
}
