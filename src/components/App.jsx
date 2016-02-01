import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = NoteStore.getState();

    this._addNote = this._addNote.bind(this);
    this._editNote = this._editNote.bind(this);
    this._deleteNote = this._deleteNote.bind(this);
    this._storeChanged = this._storeChanged.bind(this);
  }

  componentDidMount() {
      NoteStore.listen(this._storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this._storeChanged);
  }

  _storeChanged(state) {
    this.setState(state);
  }

  _addNote() {
    NoteActions.create({task: 'New task'});
  }

  _editNote(id, task) {
    NoteActions.update({id, task});
  }

  _deleteNote(id) {
    NoteActions.delete(id);
  }

  render() {
    const notes = this.state.notes;

    return (
       <div>
         <button className="add-note" onClick={this._addNote}>+ Add Note</button>
         <Notes notes={notes}
           onEdit={this._editNote}
           onDelete={this._deleteNote} />

       </div>
     );
  }
}
