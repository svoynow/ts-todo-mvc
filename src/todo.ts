import uuidv4 from 'uuid/v4';
import { ShowAll, Todo } from './interfaces';
import { switchStatus, todoActive } from './todoStatus';

export const showAll: ShowAll = { type: 'TodoAll' };

export const toggleStatus = (todo: Todo) => ({
  ...todo,
  status: switchStatus(todo.status),
});

export const makeTodo = (title: string): Todo => ({
  id: uuidv4(),
  status: todoActive,
  title,
});
