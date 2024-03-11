import React from "react";
import Note from './Note';
import {format} from 'date-fns'
import styled from "styled-components";



const NoteFeed = ({notes}) => {
    return (
        <div>
            {notes.map(note => (
                <div key={note.id}>
                    <Note note={note}/>
                </div>
            ))}
        </div>
    )
};

export default NoteFeed