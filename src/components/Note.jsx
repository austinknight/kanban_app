import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this._renderEdit = this._renderEdit.bind(this);
    this._renderNote = this._renderNote.bind(this);
    this._edit = this._edit.bind(this);
    this._checkEnter = this._checkEnter.bind(this);
    this._finishEdit = this._finishEdit.bind(this);
    this._renderDelete = this._renderDelete.bind(this);
  }

  _renderEdit() {
    return (
      <input type="text"
        ref={
          (e) => e ? e.selectionStart = this.props.task.length : null
        }
        autoFocus={true}
        defaultValue={this.props.task}
        onBlur={this._finishEdit}
        onKeyPress={this._checkEnter}
      />
    );
  }

  _renderNote() {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this._edit}>
        <span>{this.props.task}</span>
        {onDelete ? this._renderDelete() : null }
      </div>
    );
  }

  _edit() {
    this.setState({
      editing: true
    });
  }

  _checkEnter(e) {
    if(e.key === 'Enter') {
      this._finishEdit(e);
    }
  }

  _finishEdit(e) {
    const value = e.target.value;

    if(this.props.onEdit && value.trim()) {
      this.props.onEdit(value);

      this.setState({
        editing: false
      });
    }
  }

  _renderDelete() {
    return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
  }

  render() {
    if (this.state.editing) {
      return this._renderEdit();
    }

    return this._renderNote();
  }
}
