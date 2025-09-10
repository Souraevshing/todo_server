import {NextFunction, Request, Response, Router} from 'express';

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodoById,
    markTodoComplete
} from '../controllers/todo.controller';

function ensureCompletedBoolean(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        typeof req.body?.completed !== "undefined" &&
        typeof req.body.completed !== "boolean"
    ) {
        return res.status(422).json({ message: "`completed` must be boolean" });
    }
    next();
}

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodoById);

router.patch('/:id/complete', ensureCompletedBoolean, markTodoComplete);

export default router;
