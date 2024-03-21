import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import {useNavigate} from 'react-router-dom'
import { NEW_NOTE } from "../gql/mutation";
import { GET_NOTES } from "../gql/query";


const NewNote = props => {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'New Note'
    });

    const [data, {loading, error}] = useMutation(NEW_NOTE, {
        refetchQueries: [{query: GET_NOTES}],
        onCompleted: data => {
            navigate(`note/${data.newNote.id}`)
        }
    })

    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;

    return <NoteForm action = {data} />;
};

export default NewNote;