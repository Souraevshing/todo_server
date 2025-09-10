"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsByTitle = existsByTitle;
const mongoose_1 = require("mongoose");
const todo_model_1 = require("../models/todo.model");
const normalize_title_util_1 = require("./normalize-title.util");
async function existsByTitle(normalizedTitle, excludeId) {
    const titleKey = (0, normalize_title_util_1.normalizeTitleUtil)(normalizedTitle);
    const filter = { titleKey };
    if (excludeId) {
        filter._id = { $ne: new mongoose_1.Types.ObjectId(excludeId) };
    }
    const existing = await todo_model_1.Todo.findOne(filter).select({ _id: 1 }).lean();
    return !!existing;
}
