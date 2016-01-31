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
    return <div onClick={this._edit}>{this.props.task}</div>;
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

  render() {
    if (this.state.editing) {
      return this._renderEdit();
    }

    return this._renderNote();
  }
}
