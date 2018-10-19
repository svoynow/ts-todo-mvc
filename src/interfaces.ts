export interface TodoActive {
  type: 'TodoActive';
}

export interface TodoCompleted {
  type: 'TodoCompleted';
}

export type TodoStatus = TodoActive | TodoCompleted;

export interface ShowAll {
  type: 'TodoAll';
}

export type NowShowing = TodoStatus | ShowAll;

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}

export interface IModel {
  todos: Todo[];
}
