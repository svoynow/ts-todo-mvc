import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { NowShowing } from '../interfaces';

interface Props {
  completedCount: number;
  onClearCompleted: () => void;
  nowShowing: NowShowing;
  count: number;
}

export class TodoFooter extends PureComponent<Props, {}> {
  renderClearButton = () =>
    this.props.completedCount > 0 ? (
      <button className="clear-completed" onClick={this.props.onClearCompleted}>
        Clear completed
      </button>
    ) : null;

  render() {
    const inflected = this.props.count > 1 ? 'items' : 'item';
    const { nowShowing, count } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> {inflected} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="/"
              className={classNames({
                selected: nowShowing.type === 'TodoAll',
              })}
            >
              All
            </a>
          </li>{' '}
          <li>
            <a
              href="/active"
              className={classNames({
                selected: nowShowing.type === 'TodoActive',
              })}
            >
              Active
            </a>
          </li>{' '}
          <li>
            <a
              href="/completed"
              className={classNames({
                selected: nowShowing.type === 'TodoCompleted',
              })}
            >
              Completed
            </a>
          </li>
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
