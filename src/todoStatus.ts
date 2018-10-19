import { TodoActive, TodoCompleted, TodoStatus } from './interfaces';

export const todoActive: TodoActive = { type: 'TodoActive' };
export const todoCompleted: TodoCompleted = { type: 'TodoCompleted' };

export const switchStatus = (status: TodoStatus) => {
  switch (status.type) {
    case 'TodoActive':
      return todoCompleted;
    case 'TodoCompleted':
      return todoActive;
  }
};
