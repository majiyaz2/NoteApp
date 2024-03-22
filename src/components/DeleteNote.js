import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";



const DeleteNote = props => {
    const navigate = useNavigate()
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            deleteNoteId: props.noteId
        },
        refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
        onCompleted: data => {
            navigate('/mynotes')
        }
    })

    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}

export default DeleteNote