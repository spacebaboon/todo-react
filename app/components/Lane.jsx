import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {

    render() {
        const {name, ...props} = this.props;

        return (
            <div {...props}>
                <div className='lane-header'>
                    <div className='lane-name'>{name}</div>
                    <div className='lane-add-note'>
                        <button onClick={this.addNote}>+</button>
                    </div>
                </div>
                <AltContainer
                    stores={[NoteStore]}
                    inject={ {
                        items: () => NoteStore.getState().notes || []
                    } } >
                    <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
                </AltContainer>
            </div>
        );
    }

    addNote() {
        NoteActions.create({task: 'New task'});
    }

    editNote(id, task) {
        NoteActions.update({id, task});
    }

    deleteNote(id) {
        NoteActions.delete(id);
    }
}