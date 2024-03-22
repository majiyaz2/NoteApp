import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";

import { GET_ME, GET_MY_FAVS, GET_NOTE } from "../gql/query";
import NoteForm from "../components/NoteForm";
import { EDIT_NOTE } from "../gql/mutation";


const EditNote = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    console.log('Received id:', id);
    const {loading, error, data}  = useQuery(GET_NOTE, {variables: {noteId: id}});
    const {data: userdata} = useQuery(GET_MY_FAVS);
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {updateNoteId: id},
        onCompleted: () => {
            navigate(`/note/${id}`)
        }
    })

    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;
    console.log(userdata);
    console.log(data);
    // if (userdata.me.id != data.note.author.id){
    //     return <p>You do not have access to edit this note</p>
    // }
    return  <NoteForm content = {data.note.cotent} action = {editNote}/>
    

};

export default EditNote;