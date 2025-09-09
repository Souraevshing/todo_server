import { FilterQuery, Types } from "mongoose";

import { ITodo, Todo } from "../models/todo.model";
import { normalizeTitleUtil } from "./normalize-title.util";

export async function existsByTitle(normalizedTitle: string, excludeId?: string): Promise<boolean> {
    const titleKey = normalizeTitleUtil(normalizedTitle);
    const filter: FilterQuery<ITodo> = { titleKey } as any;
    if (excludeId) {
        filter._id = { $ne: new Types.ObjectId(excludeId) };
    }
    const existing = await Todo.findOne(filter).select({ _id: 1 }).lean();
    return !!existing;
}
