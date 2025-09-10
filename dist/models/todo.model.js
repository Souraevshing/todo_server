"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    titleKey: { type: String, required: true, select: false },
}, {
    timestamps: true,
});
const normalize = (s) => s.trim().replace(/\s+/g, ' ').toLowerCase();
todoSchema.pre('validate', function (next) {
    const doc = this;
    if (doc.title) {
        doc.titleKey = normalize(doc.title);
    }
    next();
});
todoSchema.pre('findOneAndUpdate', function (next) {
    this.setOptions({ runValidators: true });
    const update = this.getUpdate();
    if (!update)
        return next();
    const nextTitle = (update.$set && update.$set.title) ?? update.title;
    if (typeof nextTitle === 'string') {
        const normalized = normalize(nextTitle);
        if (update.$set)
            update.$set.titleKey = normalized;
        else
            update.$set = { ...update.$set, titleKey: normalized };
    }
    next();
});
todoSchema.index({ titleKey: 1 });
exports.Todo = (0, mongoose_1.model)('Todo', todoSchema);
