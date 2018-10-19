import { IModel, Todo, TodoStatus } from './interfaces';
import { retrieve, store } from './storage';
import { makeTodo, toggleStatus } from './todo';
import { todoCompleted } from './todoStatus';

const storageKey = 'typescript-todo-mvc';

export class Model implements IModel {
  static hydrate = () => {
    return new Model(retrieve(storageKey) || []);
  };

  todos: Todo[];
  onChanges: Array<(() => any)>;

  constructor(todos: Todo[]) {
    this.todos = todos;
    this.onChanges = [];
  }

  onChange = (f: () => any) => {
    this.onChanges = [...this.onChanges, f];
  };

  deleteTodo = (todo: Todo) => {
    this.todos = this.todos.filter(t => t !== todo);
    this.saveAll();
  };

  addTodo = (title: string) => {
    this.todos = [...this.todos, makeTodo(title)];
    this.saveAll();
  };

  saveTodo = (todo: Todo, title: string) => {
    this.todos = this.todos.map(t => (t === todo ? { ...todo, title } : t));
    this.saveAll();
  };

  toggle = (todo: Todo) => {
    this.todos = this.todos.map<Todo>(t => (todo === t ? toggleStatus(t) : t));
    this.notify();
  };

  toggleAll = (status: TodoStatus) => {
    this.todos.map(t => ({ ...t, status }));
    this.notify();
  };

  clearCompleted = () => {
    this.todos = this.todos.filter(t => t.status !== todoCompleted);
    this.saveAll();
  };

  private notify = () => {
    this.onChanges.forEach(cb => cb());
  };

  private saveAll = () => {
    store(storageKey, this.todos);
    this.notify();
  };
}
