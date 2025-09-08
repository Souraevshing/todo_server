import { Router } from 'express';

import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodoById
} from '../controllers/todo.controller';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodoById);

export default router;
