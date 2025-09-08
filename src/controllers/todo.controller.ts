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
export async function getTodos(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const existingTodo = await todoService.getTodos();
        res.status(200).json(existingTodo);
    } catch(err) {
        console.error(err);
        next(err);
    }
}

/**
 * Get a single Todo by ID.
 */
export async function getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const existingTodo = await todoService.getTodoById(req.params.id);
        if(!existingTodo) {
            res.status(404).json({message: "Todo does not exist", status: "404"})
            return;
        }
        res.status(200).json(existingTodo);
    } catch(err) {
        console.error(err);
        next(err)
    }
}

/**
 * Update a Todo.
 */
export async function updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
        if(!updatedTodo) {
            res.status(404).json({message: "Todo does not exist", status: "404"});
            return;
        }
        res.status(200).json(updatedTodo);
    } catch(err) {
        console.error(err);
        next(err);
    }
}

/**
 * Delete a Todo.
 */
export async function deleteTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const deletedTodo = await todoService.deleteTodoById(req.params.id);
        if(!deletedTodo) {
            res.status(404).json({message: "Todo does not exist", status: "404"});
            return;
        }
        res.status(200).json({message: "Todo deleted successfully", status: "200"});
    } catch(err) {
        console.error(err);
        next(err);
    }
}
