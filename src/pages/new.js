import React, {useEffect} from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import {useNavigate} from 'react-router-dom'

const NEW_NOTE = gql`
mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`

const NewNote = props => {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'New Note'
    });

    const [data, {loading, error}] = useMutation(NEW_NOTE, {
        onCompleted: data => {

            navigate(`note/${data.newNote.id}`)
        }
    })

    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;

    return <NoteForm action = {data} />;
};

export default NewNote;