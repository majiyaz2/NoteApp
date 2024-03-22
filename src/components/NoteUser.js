import React from "react";
import {useQuery, gql} from '@apollo/client';
import {Link} from 'react-router-dom';
import { GET_ME, GET_MY_FAVS, GET_MY_NOTES } from "../gql/query";
import DeleteNote from "./DeleteNote";
import FavoriteNote from "./FavoriteNote";

const NoteUser = props => {
    const {loading, error, data} = useQuery(GET_MY_FAVS);

    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;
    // const {data: userdata} =
    return (
        <React.Fragment>
            <em>Favourites:</em> {props.note.favoriteCount}
            <br/>
            {/* "data.me.id" */}
            <FavoriteNote
                me={data.me}
                noteId = {props.note.id}
                favoriteCount = {props.note.favoriteCount}
            />
            <br/>
            { props.note.author.id === props.note.author.id && (
            <React.Fragment>
                <Link to={`/edit/${props.note.id}`}>Edit</Link><br/>
                <DeleteNote noteId={props.note.id}/>
            </React.Fragment>
            )}
        </React.Fragment>)
};

export default NoteUser;