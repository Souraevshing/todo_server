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
const todoService = __importStar(require("../services/todo.service"));
/**
 * Controller functions handle incoming HTTP requests and call the service
 * layer to perform business logic. Any errors are passed to Express's
 * error handling middleware via the `next` function.
 */
/**
 * Create a new Todo.
 */
async function createTodo(req, res, next) {
    try {
        const payload = req.body;
        const newTodo = await todoService.createTodo(payload);
        res.status(201).json(newTodo);
    }
    catch (err) {
        if (err?.statusCode === 409) {
            res.status(409).json({ message: err.message, statusCode: '409' });
            return;
        }
        next(err);
    }
}
/**
 * Get all Todos.
 */
async function getTodos(_req, res, next) {
    try {
        const existingTodo = await todoService.getTodos();
        res.status(200).json(existingTodo);
    }
    catch (err) {
        next(err);
    }
}
/**
 * Get a single Todo by ID.
 */
async function getTodoById(req, res, next) {
    try {
        const existingTodo = await todoService.getTodoById(req.params.id);
        if (!existingTodo) {
            res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
            return;
        }
        res.status(200).json(existingTodo);
    }
    catch (err) {
        next(err);
    }
}
/**
 * Update a Todo.
 */
async function updateTodo(req, res, next) {
    try {
        const payload = {
            id: req.params.id,
            updateFields: req.body,
        };
        const updatedTodo = await todoService.updateTodo(payload);
        if (!updatedTodo) {
            res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
            return;
        }
        res.status(200).json(updatedTodo);
    }
    catch (err) {
        if (err?.statusCode === 409) {
            res.status(409).json({ message: err.message, statusCode: '409' });
            return;
        }
        next(err);
    }
}
/**
 * Delete a Todo.
 */
async function deleteTodoById(req, res, next) {
    try {
        const deletedTodo = await todoService.deleteTodoById(req.params.id);
        if (!deletedTodo) {
            res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
            return;
        }
        res.status(200).json({ ok: true, id: deletedTodo._id });
    }
    catch (err) {
        next(err);
    }
}
/**
 * Mark todo complete
 */
async function markTodoComplete(req, res, next) {
    try {
        const { id } = req.params;
        const completed = typeof req.body?.completed === "boolean" ? req.body.completed : true;
        const todo = await todoService.markTodoComplete(id, completed);
        res.status(200).json(todo);
    }
    catch (err) {
        next(err);
    }
}
