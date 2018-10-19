import * as React from 'react';
import { NowShowing, Todo, TodoStatus } from '../interfaces';
import { Model } from '../model';
import { showAll } from '../todo';
import { todoActive, todoCompleted } from '../todoStatus';
import { TodoFooter } from './TodoFooter';
import { TodoItem } from './TodoItem';

interface HasPath {
  path: string;
}

interface State {
  model: Model;
  nowShowing: NowShowing;
  editing: string | null;
}

const nowShowing = (path: string): NowShowing => {
  switch (path) {
    case 'completed':
      return todoCompleted;
    case 'active':
      return todoActive;
    default:
      return showAll;
  }
};

const countTodosByStatus = (todos: Todo[], status: TodoStatus) =>
  todos.filter(t => t.status.type === status.type).length;

class App extends React.Component<HasPath, State> {
  state = {
    editing: null,
    model: Model.hydrate(),
    nowShowing: nowShowing(this.props.path),
  };

  newFieldRef: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();

  activeTodoCount = () =>
    countTodosByStatus(this.state.model.todos, todoActive);

  completedCount = () =>
    countTodosByStatus(this.state.model.todos, todoCompleted);

  hasTodos = () => this.state.model.todos.length > 0;

  renderTodos = () =>
    this.todos().map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        editing={false}
        onSave={this.save}
        onDestroy={this.delete}
        onEdit={this.edit}
        onCancel={this.cancel}
        onToggle={this.toggle}
      />
    ));

  renderHeader = () => (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={this.newFieldRef}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={this.handleNewTodoKeyDown}
        autoFocus={true}
      />
    </header>
  );

  renderFooter = () => {
    const completed = this.completedCount();
    const active = this.activeTodoCount();
    return completed || active ? (
      <TodoFooter
        count={active}
        completedCount={completed}
        nowShowing={this.state.nowShowing}
        onClearCompleted={this.clearCompleted}
      />
    ) : null;
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.hasTodos() ? (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={this.toggleAll}
              checked={this.activeTodoCount() === 0}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">{this.renderTodos()}</ul>
          </section>
        ) : null}
        {this.renderFooter()}
      </div>
    );
  }

  todos = () => {
    switch (this.state.nowShowing.type) {
      case 'TodoActive':
      case 'TodoCompleted':
        return this.filteredTodos(this.state.nowShowing);
      default:
        return this.state.model.todos;
    }
  };

  // event handlers

  cancel = () => this.setState(state => ({ ...state, editing: null }));

  save = (todo: Todo, text: string) => {
    const self = this;
    self.state.model.saveTodo(todo, text);
  };

  edit = (todo: Todo) =>
    this.setState(state => ({ ...state, editing: todo.id }));

  delete = (todo: Todo) => this.state.model.deleteTodo(todo);

  filteredTodos = (status: TodoStatus) =>
    this.state.model.todos.filter((t: Todo) => t.status.type === status.type);

  toggle = (todo: Todo) => {
    const self = this;
    self.state.model.toggle(todo);
  };

  shouldComponentUpdate?() {
    return true;
  }

  toggleAll = (e: React.FormEvent<HTMLInputElement>) => {
    const showing = this.todos();
    const allCompleted =
      showing.length ===
      showing.filter(t => t.status.type === 'TodoCompleted').length;
    const toggleTo = allCompleted ? todoActive : todoCompleted;
    this.state.model.toggleAll(toggleTo);
  };

  handleNewTodoKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    const field = this.newFieldRef.current;
    if (field && field.value) {
      this.state.model.addTodo(field.value);
      field.value = '';
    }
  };

  clearCompleted = () => {
    this.state.model.clearCompleted();
  };
}

export default App;
