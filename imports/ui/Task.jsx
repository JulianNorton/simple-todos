import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // sets checked property to opposite value [toggle]
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id)
  }

togglePrivate() {
  Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
}

  render() {
    // change classname with toggle check/unchecked
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    return (
      <li className={taskClassName}>
        <h1>:)</h1>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public'}
          </button>
          ) : ''}
        <span className="text">
          <strong>{this.props.task.username}</strong>
          : {this.props.task.text}
        </span>
      </li>
    );
  }
}

 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};