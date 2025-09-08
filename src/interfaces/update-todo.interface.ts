import { UpdateQuery } from 'mongoose';

import { ITodo } from '../models/todo.model';

export interface IUpdateTodo {
  id: string;
  updateFields: UpdateQuery<ITodo>;
}
