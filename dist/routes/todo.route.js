"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
function ensureCompletedBoolean(req, res, next) {
    if (typeof req.body?.completed !== "undefined" &&
        typeof req.body.completed !== "boolean") {
        return res.status(422).json({ message: "`completed` must be boolean" });
    }
    next();
}
const router = (0, express_1.Router)();
router.post('/', todo_controller_1.createTodo);
router.get('/', todo_controller_1.getTodos);
router.get('/:id', todo_controller_1.getTodoById);
router.patch('/:id', todo_controller_1.updateTodo);
router.delete('/:id', todo_controller_1.deleteTodoById);
router.patch('/:id/complete', ensureCompletedBoolean, todo_controller_1.markTodoComplete);
exports.default = router;
