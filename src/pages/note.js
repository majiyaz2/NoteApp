import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import Note from "../components/Note";
import { GET_NOTE } from "../gql/query";


const NotePage = () => {

    const { id } = useParams();
    console.log('Received id:', id);
    const {loading, error, data}  = useQuery(GET_NOTE, {variables: {noteId: id}});
    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;


    return (
       <Note note = {data.note}/>
    );
};

export default NotePage;