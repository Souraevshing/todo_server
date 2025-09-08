import { Request, Response, NextFunction } from 'express'

import * as todoService from '../services/todo.service'

/**
 * Controller functions handle incoming HTTP requests and call the service
 * layer to perform business logic. Any errors are passed to Express's
 * error handling middleware via the `next` function.
 */

/**
 * Create a new Todo.
 */
export async function createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newTodo = await todoService.createTodo(req.body);
        res.status(201).json(newTodo);
    } catch(err) {
        console.error(err);
        next(err)
    }
}

/**
 * Get all Todos.
 */
export async function getTodos(_req: Request, res: Response, next: NextFunction): Promise<void> {}