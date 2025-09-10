"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;
exports.deleteTodoById = deleteTodoById;
exports.markTodoComplete = markTodoComplete;
const todo_model_1 = require("../models/todo.model");
const normalize_title_util_1 = require("../utils/normalize-title.util");
/**
 * Create a new Todo document.
 *
 * @param payload An object containing the fields for the new Todo.
 * @returns The created Todo document.
 */
async function createTodo(payload) {
    const normalizedTitle = (0, normalize_title_util_1.normalizeTitleUtil)(payload.title);
    const newTodo = new todo_model_1.Todo({ ...payload, title: normalizedTitle });
    return await newTodo.save();
}
/**
 * Fetch all Todo documents from the database.
 *
 * @returns An array of Todo documents.
 */
async function getTodos() {
    return todo_model_1.Todo.find().sort({ createdAt: -1 });
}
/**
 * Fetch a single Todo by its unique identifier.
 *
 * @param id The Todo's MongoDB ObjectId as a string.
 * @returns The Todo document if found, or null.
 */
async function getTodoById(id) {
    return todo_model_1.Todo.findById(id);
}
/**
 * Update a Todo by ID. Only the provided fields will be updated; missing
 * fields are ignored.
 *
 * @returns The updated Todo document if it exists, or null.
 * @param payload
 */
async function updateTodo(payload) {
    const { id, updateFields } = payload;
    if (updateFields && updateFields.title) {
        const title = updateFields.title;
        updateFields.title = (0, normalize_title_util_1.normalizeTitleUtil)(title);
    }
    return todo_model_1.Todo.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
}
/**
 * Remove a Todo by ID.
 *
 * @param id The Todo's MongoDB ObjectId.
 * @returns The deleted Todo document if it was found and removed, or null.
 */
async function deleteTodoById(id) {
    return todo_model_1.Todo.findByIdAndDelete(id);
}
/**
 * Idempotently set the `completed` flag on a Todo.
 * Defaults to true if not provided.
 */
async function markTodoComplete(id, completed = true) {
    const { isValidObjectId } = await Promise.resolve().then(() => __importStar(require('mongoose')));
    if (!isValidObjectId(id)) {
        const err = new Error("Invalid todo id");
        err.status = 400;
        throw err;
    }
    const updated = await todo_model_1.Todo.findByIdAndUpdate(id, { $set: { completed } }, { new: true, runValidators: true });
    if (!updated) {
        const err = new Error("Todo not found");
        err.status = 404;
        throw err;
    }
    return updated;
}
