import { Request, Response, NextFunction } from 'express';

import * as todoService from '../services/todo.service';
import { ICreateTodo } from '../interfaces/create-todo.interface';
import { IUpdateTodo } from '../interfaces/update-todo.interface';

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
    const payload: ICreateTodo = req.body;
    const newTodo = await todoService.createTodo(payload);
    res.status(201).json(newTodo);
  } catch (err: any) {
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
export async function getTodos(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const existingTodo = await todoService.getTodos();
    res.status(200).json(existingTodo);
  } catch (err: any) {
    next(err);
  }
}

/**
 * Get a single Todo by ID.
 */
export async function getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const existingTodo = await todoService.getTodoById(req.params.id);
    if (!existingTodo) {
      res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
      return;
    }
    res.status(200).json(existingTodo);
  } catch (err: any) {
    next(err);
  }
}

/**
 * Update a Todo.
 */
export async function updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload: IUpdateTodo = {
      id: req.params.id,
      updateFields: req.body,
    };
    const updatedTodo = await todoService.updateTodo(payload);
    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
      return;
    }
    res.status(200).json(updatedTodo);
  } catch (err: any) {
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
export async function deleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const deletedTodo = await todoService.deleteTodoById(req.params.id);
    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo does not exist', statusCode: '404' });
      return;
    }
    res.status(204).end();
  } catch (err: any) {
    next(err);
  }
}

/**
 * Mark todo complete
 */
export async function markTodoComplete(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const completed =
            typeof req.body?.completed === "boolean" ? req.body.completed : true;

        const todo = await todoService.markTodoComplete(id, completed);
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
}
