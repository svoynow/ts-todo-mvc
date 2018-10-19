import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { Todo } from '../interfaces';

interface Props {
  key: string;
  todo: Todo;
  editing?: boolean;
  onSave: (todo: Todo, val: string) => void;
  onDestroy: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onCancel: (event: any, todo: Todo) => void;
  onToggle: (todo: Todo) => void;
}

interface State {
  editText: string;
}

export class TodoItem extends PureComponent<Props, State> {
  editFieldRef: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();

  constructor(props: Props) {
    super(props);
    const {
      todo: { title },
    } = props;
    this.state = { editText: title };
  }

  handleEdit = (event: React.FormEvent<HTMLLabelElement>) => {
    const { todo } = this.props;
    this.props.onEdit(todo);
    this.setState({ editText: this.props.todo.title });
  };

  handleSubmit = (event?: React.FormEvent<HTMLInputElement>) => {
    const val = this.state.editText.trim();
    const { todo } = this.props;
    if (val) {
      this.props.onSave(todo, val);
      this.setState(state => ({ ...state, editText: val }));
    } else {
      this.props.onDestroy(todo);
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    this.setState(state => ({ ...state, editText: input.value }));
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { todo } = this.props;
    switch (event.keyCode) {
      case 27: // ESCAPE
        this.setState(state => ({ ...state, editText: this.props.todo.title }));
        this.props.onCancel(event, todo);
        break;
      case 13: // ENTER
        this.handleSubmit();
    }
  };

  toggle = () => {
    const { onToggle, todo } = this.props;
    onToggle(todo);
  };

  destroy = () => {
    const { onDestroy, todo } = this.props;
    onDestroy(todo);
  };

  render() {
    const { editText } = this.state;
    const {
      todo: { status, title },
      editing,
    } = this.props;
    const completed = status.type === 'TodoCompleted';
    return (
      <li
        className={classNames({
          completed,
          editing,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.toggle}
          />
          <label onDoubleClick={this.handleEdit}>{title}</label>
          <button className="destroy" onClick={this.destroy} />
        </div>
        <input
          ref={this.editFieldRef}
          className="edit"
          value={editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
